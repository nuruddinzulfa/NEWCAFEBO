import { Request, Response } from "express";
import { TableService } from "./table.service";

const tableService = new TableService();

export class TableController {
  async create(req: Request, res: Response) {
    try {
      const result = await tableService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Table created successfully",
        data: result
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create table"
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const result = await tableService.findAll();

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
            : "Failed to get tables"
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const result = await tableService.findById(
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
            : "Table not found"
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await tableService.update(
        req.params.id,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Table updated successfully",
        data: result
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update table"
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await tableService.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Table deleted successfully"
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete table"
      });
    }
  }
}