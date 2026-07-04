import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const categoryService = new CategoryService();

export class CategoryController {
  async create(req: Request, res: Response) {
    try {
      const result = await categoryService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: result
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create category"
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await categoryService.findAll();

      return res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to get categories"
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const result = await categoryService.findById(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Category not found"
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await categoryService.update(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: result
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update category"
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await categoryService.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Category deleted successfully"
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete category"
      });
    }
  }
}