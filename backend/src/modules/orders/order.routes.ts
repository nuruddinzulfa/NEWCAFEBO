import { Router } from "express";
import { OrderController } from "./order.controller";
import { protect } from "../../core/middleware/auth.middleware";

const router = Router();
const orderController = new OrderController();

router.post("/", protect, orderController.create);
router.get("/", protect, orderController.findAll);
router.get("/:id", protect, orderController.findById);
router.patch("/:id", protect, orderController.update);
router.delete("/:id", protect, orderController.delete);

export default router;