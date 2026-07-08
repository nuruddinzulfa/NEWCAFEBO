import { PaymentMethod } from "@prisma/client";

export interface CreatePaymentDto {
  orderId: string;
  paymentMethod: PaymentMethod;
  paidAmount: number;
}