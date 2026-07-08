import {
  PaymentMethod,
  PaymentStatus
} from "@prisma/client";

export interface UpdatePaymentDto {
  paymentMethod?: PaymentMethod;
  paidAmount?: number;
  status?: PaymentStatus;
}