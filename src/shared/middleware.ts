import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { jwtAuth } from "../utils/jwt-auth";

const app = express();

//middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
    credentials: true, // Allow cookies to be sent and received
    // credentials: process.env.FRONTEND_URL === "http://localhost:3000" ? true : false
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(jwtAuth);
app.use(express.urlencoded({ extended: false }));

export default app;
