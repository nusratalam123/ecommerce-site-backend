import { NextFunction, Request, Response } from "express";
import Blacklist from "../model/blacklist.model";
import User from "./../model/user.model";
import { generateToken, getBearerToken } from "./../utils/token";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        message: "email already exist",
      });
    }

    const savedUser = await User.create(req.body);
    await savedUser.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: "User signup successful",
    });
  } catch (err) {
    next(err);
  }
};

// user login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide your credentials",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "No user found. Please create an account",
      });
    }

    //@ts-expect-error
    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Password is not correct",
      });
    }

    if (user.status === "BANNED") {
      return res.status(400).json({
        message: "The user is banned",
      });
    }

    const token = generateToken(user);
    const { password: pwd, ...info } = user.toObject();

    return res.status(200).json({
      message: "Login successful",
      data: {
        ...info,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = await getBearerToken(req);
    await Blacklist.create({ token: token });

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (err) {
    next(err);
  }
};
