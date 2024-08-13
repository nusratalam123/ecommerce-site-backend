import { Router } from "express";
import authRoutes from "./../routes/auth.route";

import userRoutes from "./../routes/user.route";
import carRoutes from "./../routes/carPost.route";
import bookingRoutes from "./../routes/book.route";
const router = Router();

// Root route
router.get("/", (_, res) => {
  res.send("App Working successfully");
});

// general Routes
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/car", carRoutes);
router.use("/book", bookingRoutes);
// Handle not found
router.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default router;
