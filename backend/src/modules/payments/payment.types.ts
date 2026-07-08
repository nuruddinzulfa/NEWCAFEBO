import { PaymentMethod, PaymentStatus } from "@prisma/client";

export interface PaymentResponse {
  id: string;
  orderId: string;
  paymentMethod: PaymentMethod;
  paidAmount: number;
  changeAmount: number;
  status: PaymentStatus;
  createdAt: Date;
}