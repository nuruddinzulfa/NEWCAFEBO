import { PrismaClient } from "@prisma/client";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

const prisma = new PrismaClient();

export class OrderRepository {
  async create(data: CreateOrderDto) {
    return prisma.order.create({
      data
    });
  }

  async findAll() {
    return prisma.order.findMany({
      include: {
        table: true,
        orderItems: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async findById(id: string) {
    return prisma.order.findUnique({
      where: {
        id
      },
      include: {
        table: true,
        orderItems: true
      }
    });
  }

  async findByOrderNumber(orderNumber: string) {
    return prisma.order.findUnique({
      where: {
        orderNumber
      }
    });
  }

  async update(
    id: string,
    data: UpdateOrderDto
  ) {
    return prisma.order.update({
      where: {
        id
      },
      data
    });
  }

  // ✅ Method baru untuk update totalAmount
  async updateTotalAmount(
    id: string,
    totalAmount: number
  ) {
    return prisma.order.update({
      where: {
        id
      },
      data: {
        totalAmount
      }
    });
  }

  async delete(id: string) {
    return prisma.order.delete({
      where: {
        id
      }
    });
  }
}