import { z } from "zod";

export const createMenuSchema = z.object({
  name: z
    .string()
    .min(3, "Menu name must be at least 3 characters"),

  description: z.string().optional(),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  imageUrl: z.string().optional(),

  categoryId: z.string().uuid("Invalid category ID")
});

export const updateMenuSchema =
  createMenuSchema.partial();