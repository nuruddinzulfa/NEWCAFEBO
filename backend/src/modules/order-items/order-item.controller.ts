import { Request, Response } from "express";
import { OrderItemService } from "./order-item.service";

const orderItemService = new OrderItemService();

export class OrderItemController {
  async create(req: Request, res: Response) {
    try {
      const result = await orderItemService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Order Item created successfully",
        data: result
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create order item"
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await orderItemService.findAll();

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
            : "Failed to get order items"
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const result = await orderItemService.findById(
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
            : "Order Item not found"
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await orderItemService.update(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Order Item updated successfully",
        data: result
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update order item"
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await orderItemService.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Order Item deleted successfully"
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete order item"
      });
    }
  }
}