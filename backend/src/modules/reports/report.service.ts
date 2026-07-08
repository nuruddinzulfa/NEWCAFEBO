import { ReportRepository } from "./report.repository";

export class ReportService {
  private reportRepository: ReportRepository;

  constructor() {
    this.reportRepository = new ReportRepository();
  }

  async getSalesReport() {
    return this.reportRepository.getSalesReport();
  }

  async getMenuReport() {
  const orderItems =
    await this.reportRepository.getMenuReport();

  const report = new Map<
    string,
    {
      menuName: string;
      totalSold: number;
      totalRevenue: number;
    }
  >();

  for (const item of orderItems) {
    const key = item.menu.id;

    if (!report.has(key)) {
      report.set(key, {
        menuName: item.menu.name,
        totalSold: 0,
        totalRevenue: 0
      });
    }

    const menu = report.get(key)!;

    menu.totalSold += item.quantity;

    menu.totalRevenue +=
      item.quantity * item.price;
  }

  return Array.from(report.values());
}
}