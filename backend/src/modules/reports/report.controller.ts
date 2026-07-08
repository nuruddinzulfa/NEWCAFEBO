import { Request, Response } from "express";
import { ReportService } from "./report.service";

export class ReportController {
  private reportService: ReportService;

  constructor() {
    this.reportService = new ReportService();
  }

  async getSalesReport(
    _: Request,
    res: Response
  ) {
    try {
      const data =
        await this.reportService.getSalesReport();

      return res.status(200).json({
        success: true,
        data
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
  async getMenuReport(
  _: Request,
  res: Response
) {
  try {
    const data =
      await this.reportService.getMenuReport();

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
}

export default new ReportController();