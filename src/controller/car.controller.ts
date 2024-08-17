import { NextFunction, Request, Response } from "express";

import Car from "./../model/car.model";

// get all car posts
export const getAllCarPosts = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const posts = await Car.find({}).sort({ name: -1 });

    res.status(200).json({
      message: "car posts create successfully",
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

// get single car post
export const getSingleCarPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await Car.findOne({ _id: req.params.id });

    if (!post) {
      res.status(400).json({
        message: "Car post Not found",
      });
    }

    res.status(200).json({
      message: "Car post get successfully",
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

// get all car post search by area
export const getAllCarPostSearchByArea = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const area = String(req.params.area); // Get type from request parameter
    //console.log(area);

    if (!area) {
      return res.status(400).json({ message: "Missing search car post" });
    }

    const posts = await Car.find({ sellerCountry: area }); // Find by type

    res.status(200).json({
      message: "Car post get successfully",
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

// get all Tution post search by ammount
export const getAllCarPostSearchByAmmount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ammount = String(req.params.ammount); // Get type from request parameter
    console.log(ammount);

    if (!ammount) {
      return res.status(400).json({ message: "Missing search car post" });
    }
    const posts = await Car.find({ price: ammount }); // Find by type

    res.status(200).json({
      message: "Car post get successfully",
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

// get all car post search by group
export const getAllCarPostSearchByModel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const group = String(req.params.group); // Get type from request parameter
    console.log(group);

    if (!group) {
      return res.status(400).json({ message: "Missing search car post" });
    }
    const posts = await Car.find({ brandModel: group }); // Find by type

    res.status(200).json({
      message: "Car posts get successfully",
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

// create new Car post
export const createCarPost = async (
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

    const post = await Car.create(data);

    res.status(201).json({
      message: "Car post created Successfully",
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

// update a Car post
export const updateCarPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postId = req.params.id;
    const post = await Car.findById(postId);

    if (!post) {
      res.status(400).json({
        message: "post not found",
      });
    }

    const updatedUser = await Car.findByIdAndUpdate(postId, req.body);

    res.status(200).json({
      message: "Car post updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

// delete car post
export const deleteCarPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await Car.findByIdAndDelete(req.params.id);

    if (!post) {
      res.status(400).json({
        message: "Car post not found",
      });
    }

    res.status(200).json({
      message: "Car post Deleted Successfully",
    });
  } catch (err) {
    next(err);
  }
};

