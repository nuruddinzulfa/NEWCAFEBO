import { Router } from "express";
import dashboardController from "./dashboard.controller";
import { protect } from "../auth/auth.middleware";

const router = Router();

router.get(
  "/",
  protect,
  dashboardController.getDashboard.bind(dashboardController)
);

export default router;