import { OrderStatus } from "@prisma/client";

export interface UpdateOrderDto {
  customerName?: string;
  customerPhone?: string;
  tableId?: string;
  status?: OrderStatus;
  totalAmount?: number;
}