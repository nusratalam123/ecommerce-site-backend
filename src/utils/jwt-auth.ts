import { NextFunction, Request, Response } from "express";
import { getBearerToken, verifyToken } from "./token";
import Blacklist from "../model/blacklist.model";
import jwt from "jsonwebtoken";
import secrets from "../config/secret";

// jwt bearer token
export async function jwtAuth(req: Request, res: Response, next: NextFunction) {
  if (
    req.path.endsWith("/login") ||
    req.path.endsWith("/signup") ||
    req.path.match(/^\/api\/v1\/product\/.+/) || // PRODUCT REGEX
    req.path.match(/^\/api\/v1\/category\/.+/) || // Category REGEX
    req.path.match(/^\/api\/v1\/banner\/.+/) || // Banner REGEX
    !req.path.includes("/api/v1")
  ) {
    next();
    return;
  }

  try {
    const isTokenExist = await verifyToken(req);
    if (!isTokenExist) {
      throw new Error("Unauthorized");
    }
    let token;
    // Check for token in Authorization header
    const authorizationHeader = req.headers["Authorization"];
    if (authorizationHeader) {
      const bearer = (authorizationHeader as string).split(" ");
      token = bearer[1];
    }

    // If no token in Authorization header, check cookies
    if (!token && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }

    console.log("Token:", token);

    // const token = await getBearerToken(req);
    // console.log(token);
    if (!token) {
      console.log("No Bearer Token Found"); // Log for debugging
      throw new Error("Unauthorized");
    }

    jwt.verify(token, secrets.jwt_secret, (err: any) => {
      if (err) {
        throw new Error("Forbidden");
      }
    });

    const isRevoked = await Blacklist.find({ token: token });
    if (isRevoked.length != 0) {
      throw new Error("Revoked");
    }

    // save auth info in request object
    saveAuthInfo(req, token);
    next();
  } catch (err: any) {
    return res.status(403).json({
      message: err.message,
    });
  }
}

/**
 * decrpty the header authorization token and save
 * the info in request object. later that info can be used
 */
async function saveAuthInfo(req: Request, token?: string) {
  try {
    if (!token) {
      throw new Error("Token not found");
    }

    const payload = jwt.decode(token);

    // setting req data
    //@ts-expect-error
    req.authId = payload.id;

    //@ts-expect-error
    req.role = payload.role;
  } catch (error) {
    throw error;
  }
}
