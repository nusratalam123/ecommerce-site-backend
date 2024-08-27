import { Router } from "express";

import {
  logout,
  userSignup,
  userLogin,
  getCurrentUser,
} from "../controller/auth.controller";

const router = Router();

// register new user
router.post("/signup", userSignup);

// user login
router.post("/login", userLogin);

// get current user
router.get("/current-user", getCurrentUser);

// user logout
router.delete("/logout", logout);



export default router;
