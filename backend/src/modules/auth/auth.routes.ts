import { Router } from "express";
import { AuthController } from "./auth.controller";
import { protect } from "../../core/middleware/auth.middleware";

const router = Router();
const authController = new AuthController();

// Register
router.post(
  "/register",
  authController.register
);

// Login
router.post(
  "/login",
  authController.login
);

// Test Route
router.get(
  "/test",
  (_, res) => {
    return res.status(200).json({
      success: true,
      message: "Auth route works"
    });
  }
);

// Get Logged In User Profile
router.get(
  "/profile",
  protect,
  authController.profile
);

export default router;