import { OrderStatus } from "@prisma/client";

export interface OrderResponse {
  id: string;
  orderNumber: string;
  customerName?: string | null;
  customerPhone?: string | null;
  tableId?: string | null;
  status: OrderStatus;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}