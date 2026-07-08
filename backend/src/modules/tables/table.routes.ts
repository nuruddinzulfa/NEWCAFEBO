import { Router } from "express";
import { TableController } from "./table.controller";
import { protect } from "../../core/middleware/auth.middleware";

const router = Router();
const tableController = new TableController();

// CRUD Routes
router.post("/", protect, tableController.create);
router.get("/", protect, tableController.findAll);
router.get("/:id", protect, tableController.findById);
router.patch("/:id", protect, tableController.update);
router.delete("/:id", protect, tableController.delete);

export default router;