import { Router } from "express";
import { OrderItemController } from "./order-item.controller";
import { protect } from "../../core/middleware/auth.middleware";

const router = Router();
const orderItemController = new OrderItemController();

router.post("/", protect, orderItemController.create);
router.get("/", protect, orderItemController.findAll);
router.get("/:id", protect, orderItemController.findById);
router.patch("/:id", protect, orderItemController.update);
router.delete("/:id", protect, orderItemController.delete);

export default router;