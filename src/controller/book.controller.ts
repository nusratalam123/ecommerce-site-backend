import { NextFunction, Request, Response } from "express";

import User from "./../model/car.book";

// get all book post users
export const getAllbookingUser = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find({}).sort({ name: -1 });

    res.status(200).json({
      message: "Users get successfully",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

// get single booking post user
export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      res.status(400).json({
        message: "User Not found",
      });
    }

    res.status(200).json({
      message: "User get successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// get single booking  user 
export const getSingleBookingUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select("status");

    if (!user) {
      res.status(200).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User status get successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// create new booking post
export const createBookingPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    if (Object.keys(data).length === 0) {
      res.status(400).json({
        message: "Data can't be empty",
      });
    }

    const user = await User.create(data);

    res.status(201).json({
      message: "Booking post created Successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};


// delete user
export const deleteBookingPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(400).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      message: "Booking post Deleted Successfully",
    });
  } catch (err) {
    next(err);
  }
};

