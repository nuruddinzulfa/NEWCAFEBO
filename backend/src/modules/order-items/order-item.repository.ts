import { PrismaClient } from "@prisma/client";
import { CreateOrderItemDto } from "./dto/create-order-item.dto";
import { UpdateOrderItemDto } from "./dto/update-order-item.dto";

const prisma = new PrismaClient();

export class OrderItemRepository {
  async create(data: CreateOrderItemDto & { price: number }) {
    return prisma.orderItem.create({
      data
    });
  }

  async findAll() {
    return prisma.orderItem.findMany({
      include: {
        order: true,
        menu: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async findById(id: string) {
    return prisma.orderItem.findUnique({
      where: {
        id
      },
      include: {
        order: true,
        menu: true
      }
    });
  }

  // ✅ Method baru
  async findByOrderId(orderId: string) {
    return prisma.orderItem.findMany({
      where: {
        orderId
      }
    });
  }

  async update(
    id: string,
    data: UpdateOrderItemDto
  ) {
    return prisma.orderItem.update({
      where: {
        id
      },
      data
    });
  }

  async delete(id: string) {
    return prisma.orderItem.delete({
      where: {
        id
      }
    });
  }
}