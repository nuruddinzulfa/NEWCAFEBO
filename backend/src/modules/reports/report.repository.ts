import { prisma } from "../../core/database/prisma";

export class ReportRepository {
  // ===============================
  // Sales Report
  // ===============================
  async getSalesReport() {
    return prisma.payment.findMany({
      select: {
        paymentMethod: true,
        totalAmount: true,
        paidAmount: true,
        changeAmount: true,
        createdAt: true,

        order: {
          select: {
            orderNumber: true,
            customerName: true
          }
        }
      },

      orderBy: {
        createdAt: "desc"
      }
    });
  }

  // ===============================
  // Menu Report
  // ===============================
  async getMenuReport() {
  return prisma.orderItem.findMany({
    include: {
      menu: true
    }
  });
}
}