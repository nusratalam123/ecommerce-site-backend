import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import Blacklist from "../model/blacklist.model";
import User from "./../model/user.model";
import { generateToken, getBearerToken } from "./../utils/token";

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-expect-error
    const id = req.authId;

    // @ts-expect-error
    const role = req.role;

    let data;

    switch (role) {
      case "user":
        data = await User.findById(id);
        break;
      // case "vendor":
      //   data = await Vendor.findById(id);
      //   break;
      // case "superadmin":
      // case "admin":
      // case "editor":
      //   data = await Admin.findById(id);
      //   break;
    }

    res.status(200).json({
      message: "success",
      data: data,
      role: role,
    });
  } catch (err: any) {
    next(err)
  }
};

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    console.log(email)
     const user = await User.findOne({ email: email });

     if (user) {
       return res.status(400).json({
         message: "email already exist",
       });
     }

     const savedUser = await User.create(req.body);
     await savedUser.save({ validateBeforeSave: false });


    res.status(200).json({
      message: "User signup successful",
    });
  } catch (err: any) {
    next(err)
  }
};

// user login
// export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       throw new Error("Please provide your credentials")
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       throw new Error("No user found. Please create an account",)
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       throw new Error("Password is not correct")
//     }

//     if (!user.status) {
//       throw new Error("The user is banned")
//     }

//     const token = generateToken({
//       id: user._id.toString(),
//       name: user.name,
//       email: user.email,
//       role: "user",
//     });

//     const { password: pwd, ...info } = user.toObject();

//     res.status(200).json({
//       message: "Login successful",
//       data: {
//         ...info,
//         role: "user",
//         token,
//       },
//     });
//   } catch (err: any) {
//     next(err)
//   }
// };

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await getBearerToken(req);
    await Blacklist.create({ token: token });

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (err: any) {
    next(err)
  }
};
