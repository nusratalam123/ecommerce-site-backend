import { Router } from "express";

import {
  logout,
  adminSignup,
  adminLogin,
} from "../controller/auth.controller";

const router = Router();

// admin signup
router.post("/admin/signup", adminSignup);

// admin login
router.post("/admin/login", adminLogin);

// user logout
router.delete("/logout", logout);

export default router;
