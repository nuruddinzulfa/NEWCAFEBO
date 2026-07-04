import { Router } from "express";
import { CategoryController } from "./category.controller";
import { protect } from "../../core/middleware/auth.middleware";

const router = Router();
const categoryController = new CategoryController();

// Test Route
router.get("/test", (_, res) => {
  return res.status(200).json({
    success: true,
    message: "Category route works"
  });
});

// CRUD Routes
router.post("/", protect, categoryController.create);

router.get("/", protect, categoryController.findAll);

router.get("/:id", protect, categoryController.findById);

router.patch("/:id", protect, categoryController.update);

router.delete("/:id", protect, categoryController.delete);

export default router;