import { Request, Response } from "express";
import { MenuService } from "./menu.service";

const menuService = new MenuService();

export class MenuController {
  async create(req: Request, res: Response) {
    try {
      const result = await menuService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Menu created successfully",
        data: result
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create menu"
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await menuService.findAll();

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
            : "Failed to get menus"
      });
    }
  }

  async findRecommended(req: Request, res: Response) {
    try {
      const result = await menuService.findRecommended();

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
            : "Failed to get menus"
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const result = await menuService.findById(
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
            : "Menu not found"
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await menuService.update(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Menu updated successfully",
        data: result
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update menu"
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await menuService.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Menu deleted successfully"
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete menu"
      });
    }
  }
}