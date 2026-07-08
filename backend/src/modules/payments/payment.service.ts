import {
  PaymentStatus,
  OrderStatus
} from "@prisma/client";

import { PaymentRepository } from "./payment.repository";
import { OrderRepository } from "../orders/order.repository";

import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

export class PaymentService {
  private paymentRepository: PaymentRepository;
  private orderRepository: OrderRepository;

  constructor() {
    this.paymentRepository = new PaymentRepository();
    this.orderRepository = new OrderRepository();
  }

  // ==========================
  // CREATE PAYMENT
  // ==========================
  async create(data: CreatePaymentDto) {
    // Cari Order
    const order =
      await this.orderRepository.findById(
        data.orderId
      );

    if (!order) {
      throw new Error("Order not found");
    }

    // Pastikan belum pernah dibayar
    const existingPayment =
      await this.paymentRepository.findByOrderId(
        data.orderId
      );

    if (existingPayment) {
      throw new Error(
        "Order has already been paid"
      );
    }

    const totalAmount = order.totalAmount;

    if (data.paidAmount < totalAmount) {
      throw new Error(
        "Paid amount is not enough"
      );
    }

    const changeAmount =
      data.paidAmount - totalAmount;

    const payment =
      await this.paymentRepository.create({
        ...data,
        totalAmount,
        changeAmount,
        status: PaymentStatus.SUCCESS
      });

    // Update status Order
    await this.orderRepository.update(
      data.orderId,
      {
        status: OrderStatus.COMPLETED
      }
    );

    return payment;
  }

  // ==========================
  // FIND ALL
  // ==========================
  async findAll() {
    return this.paymentRepository.findAll();
  }

  // ==========================
  // FIND BY ID
  // ==========================
  async findById(id: string) {
    const payment =
      await this.paymentRepository.findById(id);

    if (!payment) {
      throw new Error("Payment not found");
    }

    return payment;
  }

  // ==========================
  // UPDATE
  // ==========================
  async update(
    id: string,
    data: UpdatePaymentDto
  ) {
    const payment =
      await this.paymentRepository.findById(id);

    if (!payment) {
      throw new Error("Payment not found");
    }

    return this.paymentRepository.update(
      id,
      data
    );
  }

  // ==========================
  // DELETE
  // ==========================
  async delete(id: string) {
    const payment =
      await this.paymentRepository.findById(id);

    if (!payment) {
      throw new Error("Payment not found");
    }

    return this.paymentRepository.delete(id);
  }
}