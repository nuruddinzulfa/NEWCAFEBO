import { Router } from "express";
import { MenuController } from "./menu.controller";
import { protect } from "../../core/middleware/auth.middleware";

const router = Router();
const menuController = new MenuController();

console.log("MENU ROUTES LOADED");

// CRUD Routes
router.post("/", protect, menuController.create);
router.get("/", menuController.findAll);
router.get("/recommended", menuController.findRecommended);
router.get("/:id", menuController.findById);
router.patch("/:id", protect, menuController.update);
router.delete("/:id", protect, menuController.delete);

export default router;