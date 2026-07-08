import { Request, Response } from "express";
import { ReservationService } from "./reservation.service";

const reservationService = new ReservationService();

export class ReservationController {
  async create(req: Request, res: Response) {
    try {
      const result = await reservationService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Reservation created successfully",
        data: result
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create reservation"
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await reservationService.findAll();

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
            : "Failed to get reservations"
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const result =
        await reservationService.findById(req.params.id);

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
            : "Reservation not found"
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result =
        await reservationService.update(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message: "Reservation updated successfully",
        data: result
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update reservation"
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await reservationService.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Reservation deleted successfully"
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete reservation"
      });
    }
  }
}