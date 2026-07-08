import { Request, Response } from "express";
import { OrderService } from "./order.service";

const orderService = new OrderService();

export class OrderController {
  async create(req: Request, res: Response) {
    try {
      const result = await orderService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: result
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create order"
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await orderService.findAll();

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
            : "Failed to get orders"
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const result = await orderService.findById(
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
            : "Order not found"
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await orderService.update(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Order updated successfully",
        data: result
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update order"
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await orderService.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Order deleted successfully"
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete order"
      });
    }
  }
}