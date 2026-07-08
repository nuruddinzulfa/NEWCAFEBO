import { Router } from "express";
import paymentController from "./payment.controller";
import { protect } from "../auth/auth.middleware";

const router = Router();

router.post(
  "/",
  protect,
  paymentController.create.bind(paymentController)
);

router.get(
  "/",
  protect,
  paymentController.findAll.bind(paymentController)
);

router.get(
  "/:id",
  protect,
  paymentController.findById.bind(paymentController)
);

router.patch(
  "/:id",
  protect,
  paymentController.update.bind(paymentController)
);

router.delete(
  "/:id",
  protect,
  paymentController.delete.bind(paymentController)
);

export default router;