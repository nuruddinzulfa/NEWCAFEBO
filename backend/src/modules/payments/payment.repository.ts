import { PrismaClient } from "@prisma/client";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

const prisma = new PrismaClient();

export class PaymentRepository {
  async create(
    data: CreatePaymentDto & {
      totalAmount: number;
      changeAmount: number;
      status: any;
    }
  ) {
    return prisma.payment.create({
      data
    });
  }

  async findAll() {
    return prisma.payment.findMany({
      include: {
        order: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async findById(id: string) {
    return prisma.payment.findUnique({
      where: {
        id
      },
      include: {
        order: true
      }
    });
  }

  async findByOrderId(orderId: string) {
    return prisma.payment.findUnique({
      where: {
        orderId
      }
    });
  }

  async update(
    id: string,
    data: UpdatePaymentDto
  ) {
    return prisma.payment.update({
      where: {
        id
      },
      data
    });
  }

  async delete(id: string) {
    return prisma.payment.delete({
      where: {
        id
      }
    });
  }
}