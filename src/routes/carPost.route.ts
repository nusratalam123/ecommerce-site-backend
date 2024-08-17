import { Router } from "express";

import {
  createCarPost,
  deleteCarPost,
  getAllCarPosts,
  getSingleCarPost,
  updateCarPost,
  getAllCarPostSearchByArea,
  getAllCarPostSearchByAmmount,
  getAllCarPostSearchByModel
} from "../controller/car.controller";

const router = Router();

// get all car post
router.get("/all", getAllCarPosts);

// get single car Post
router.get("/single/:id", getSingleCarPost);

// get all car post serach by area
router.get("/allAreaCarPosts/:area", getAllCarPostSearchByArea);

// get all car post serach by Ammount
router.get("/allAmmountCarPosts/:ammount", getAllCarPostSearchByAmmount);

// get all car post serach by Model
router.get("/allGroupCarPosts/:model", getAllCarPostSearchByModel);

// create new car Post
router.post("/create", createCarPost);

// update car post
router.put("/update-post/:id", updateCarPost);

//delete car post
router.delete("/delete/:id", deleteCarPost);

export default router;
