import { Request, Response } from "express";
import { PaymentService } from "./payment.service";

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  async create(req: Request, res: Response) {
    try {
      const payment =
        await this.paymentService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Payment created successfully",
        data: payment
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async findAll(_: Request, res: Response) {
    try {
      const payments =
        await this.paymentService.findAll();

      return res.json({
        success: true,
        data: payments
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const payment =
        await this.paymentService.findById(
          req.params.id
        );

      return res.json({
        success: true,
        data: payment
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const payment =
        await this.paymentService.update(
          req.params.id,
          req.body
        );

      return res.json({
        success: true,
        message: "Payment updated successfully",
        data: payment
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.paymentService.delete(
        req.params.id
      );

      return res.json({
        success: true,
        message: "Payment deleted successfully"
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default new PaymentController();