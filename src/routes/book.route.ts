import { Router } from "express";
import { getAllbookingUser, getSingleBookingUser, createBookingPost, deleteBookingPost } from "../controller/book.controller";

const router = Router();

// get all booking users
router.get("/all", getAllbookingUser);

// get single booking user
router.get("/single/:id", getSingleBookingUser);

// create new  booking post
router.post("/create", createBookingPost);

//delete  book post 
router.delete("/delete/:id", deleteBookingPost);

export default router;
