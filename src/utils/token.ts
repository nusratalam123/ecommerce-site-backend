import { Request } from "express";
import jwt from "jsonwebtoken";
import secrets from "../config/secret";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

// generate jwt token
export const generateToken = (user: User) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, secrets.jwt_secret, {
    expiresIn: "2d",
  });
  return token;
};

export const verifyToken = async (req: Request) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      return true;
    } else {
      throw new Error();
    }
  } catch (err) {
    return false;
  }
};

export const getBearerToken = async (req: Request) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      return bearerToken;
    } else {
      throw new Error("Token is unavailable");
    }
  } catch (err) {
    return err;
  }
};
