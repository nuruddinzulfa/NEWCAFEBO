import { Router } from "express";
import reportController from "./report.controller";
import { protect } from "../auth/auth.middleware";

const router = Router();

router.get(
  "/sales",
  protect,
  reportController.getSalesReport.bind(reportController)
);
router.get(
  "/menus",
  protect,
  reportController.getMenuReport.bind(reportController)
);

export default router;