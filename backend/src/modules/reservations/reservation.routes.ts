import { Router } from "express";
import { ReservationController } from "./reservation.controller";
import { protect } from "../../core/middleware/auth.middleware";

const router = Router();
const reservationController = new ReservationController();

// CRUD Routes
router.post("/", protect, reservationController.create);
router.get("/", protect, reservationController.findAll);
router.get("/:id", protect, reservationController.findById);
router.patch("/:id", protect, reservationController.update);
router.delete("/:id", protect, reservationController.delete);

export default router;