import { DashboardRepository } from "./dashboard.repository";
import { DashboardResponse } from "./dashboard.types";

export class DashboardService {
  private dashboardRepository: DashboardRepository;

  constructor() {
    this.dashboardRepository = new DashboardRepository();
  }

  async getDashboard(): Promise<DashboardResponse> {
    const [
      todaySales,
      todayOrders,
      completedOrders,
      availableTables,
      occupiedTables
    ] = await Promise.all([
      this.dashboardRepository.getTodaySales(),
      this.dashboardRepository.getTodayOrders(),
      this.dashboardRepository.getCompletedOrders(),
      this.dashboardRepository.getAvailableTables(),
      this.dashboardRepository.getOccupiedTables()
    ]);

    return {
      todaySales,
      todayOrders,
      completedOrders,
      availableTables,
      occupiedTables
    };
  }
}