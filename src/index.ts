import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import connectDB from "./config/db";
import secrets from "./config/secret";
import Blacklist from "./model/blacklist.model";
import middleware from "./shared/middleware";
import routes from "./shared/route";
import { getBearerToken, verifyToken } from "./utils/token";

const app = express();
const PORT = secrets.PORT;

// implement middleware
app.use(middleware);

// jwt bearer token
app.use("/", async (req, res, next) => {
  if (req.path === "/api/v1/auth/login" || req.path === "/api/v1/auth/signup") {
    next();
    return;
  }

  try {
    const isTokenExist = await verifyToken(req);
    if (!isTokenExist) {
      throw new Error("Unauthorized");
    }

    const token = await getBearerToken(req);
    const isRevoked = await Blacklist.find({ token: token });
    if (isRevoked.length != 0) {
      throw new Error("Revoked");
    }

    //@ts-expect-error
    jwt.verify(req.token, secrets.jwt_secret, (err: any) => {
      if (err) {
        throw new Error("Forbidden");
      } else {
        next();
      }
    });
  } catch (err: any) {
    return res.status(403).json({
      message: err.message,
    });
  }
});

// connect to database
connectDB();

// define routes
app.use("/api/v1", routes);

// listen to port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;
