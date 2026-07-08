import { prisma } from "../../core/database/prisma";
import { TableStatus, OrderStatus, PaymentStatus } from "@prisma/client";

export class DashboardRepository {
  // ==========================
  // Total Sales Hari Ini
  // ==========================
  async getTodaySales() {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const result = await prisma.payment.aggregate({
      _sum: {
        totalAmount: true
      },
      where: {
        status: PaymentStatus.SUCCESS,
        createdAt: {
          gte: today
        }
      }
    });

    return result._sum.totalAmount ?? 0;
  }

  // ==========================
  // Total Order Hari Ini
  // ==========================
  async getTodayOrders() {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return prisma.order.count({
      where: {
        createdAt: {
          gte: today
        }
      }
    });
  }

  // ==========================
  // Total Order Completed
  // ==========================
  async getCompletedOrders() {
    return prisma.order.count({
      where: {
        status: OrderStatus.COMPLETED
      }
    });
  }

  // ==========================
  // Total Meja Available
  // ==========================
  async getAvailableTables() {
    return prisma.restaurantTable.count({
      where: {
        status: TableStatus.AVAILABLE,
        isActive: true
      }
    });
  }

  // ==========================
  // Total Meja Occupied
  // ==========================
  async getOccupiedTables() {
    return prisma.restaurantTable.count({
      where: {
        status: TableStatus.OCCUPIED,
        isActive: true
      }
    });
  }
}