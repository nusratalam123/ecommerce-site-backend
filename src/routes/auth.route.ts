import { Router } from "express";

import {logout, userSignup } from "../controller/auth.controller";

const router = Router();

// register new user
router.post("/signup", userSignup);

// user login
//router.post("/login", login);

// user logout
router.delete("/logout", logout);



export default router;
