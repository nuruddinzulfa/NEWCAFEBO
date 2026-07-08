import { Request, Response } from "express";
import { DashboardService } from "./dashboard.service";

export class DashboardController {
  private dashboardService: DashboardService;

  constructor() {
    this.dashboardService = new DashboardService();
  }

  async getDashboard(
    _: Request,
    res: Response
  ) {
    try {
      const dashboard =
        await this.dashboardService.getDashboard();

      return res.status(200).json({
        success: true,
        data: dashboard
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default new DashboardController();