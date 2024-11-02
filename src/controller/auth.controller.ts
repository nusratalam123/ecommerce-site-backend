import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import Blacklist from "../model/blacklist.model";
import User from "../model/user.model";
import { generateToken, getBearerToken } from "./../utils/token";
import Admin from "../model/admin.model";


// admin signup
export const adminSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { adminId,email, password } = req.body;
    const admin = await Admin.findOne({ email: email });

    if (admin) {
      throw new Error("email already exist")
    }

    const savedAdmin = await Admin.create(req.body);
    await savedAdmin.save({ validateBeforeSave: false });

    res.status(200).json({
      message: "Admin signup successful",
    });
  } catch (err: any) {
    next(err)
  }
};

// admin login
export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide your credentials")
    }

    const admin = await Admin.findOne({ email });

    //console.log(admin);

    if (!admin) {
      throw new Error("No admin found. Please create an account")
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new Error("Password is incorrect")
    }

    if (!admin.status) {
      throw new Error("The admin is banned")
    }

    const token = generateToken({
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role.toLowerCase(),
    });
    const { password: pwd, ...info } = admin.toObject();

    res.status(200).json({
      message: "admin Login successful",
      data: {
        ...info,
        role: admin.role,
        token,
      },
    });
  } catch (err: any) {
    next(err)
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
  } catch (err: any) {
    next(err);
  }
};
