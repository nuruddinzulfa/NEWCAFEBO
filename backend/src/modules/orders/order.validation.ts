import { z } from "zod";
import { OrderStatus } from "@prisma/client";

export const createOrderSchema = z.object({
  orderNumber: z.string().min(3),

  customerName: z.string().optional(),

  customerPhone: z.string().optional(),

  tableId: z.string().uuid().optional()
});

export const updateOrderSchema = z.object({
  customerName: z.string().optional(),

  customerPhone: z.string().optional(),

  tableId: z.string().uuid().optional(),

  status: z.nativeEnum(OrderStatus).optional(),

  totalAmount: z.number().optional()
});