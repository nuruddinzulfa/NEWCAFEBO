import { z } from "zod";

export const createOrderItemSchema = z.object({
  orderId: z.string().uuid(),

  menuId: z.string().uuid(),

  quantity: z.number().min(1),

  notes: z.string().optional()
});

export const updateOrderItemSchema = z.object({
  quantity: z.number().min(1).optional(),

  notes: z.string().optional()
});