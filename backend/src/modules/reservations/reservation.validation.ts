import { z } from "zod";
import { ReservationStatus } from "@prisma/client";

export const createReservationSchema = z.object({
  customerName: z.string().min(3),
  customerPhone: z.string().min(8),
  customerEmail: z.string().email().optional(),

  reservationDate: z.string(),

  numberOfGuests: z.number().min(1),

  tableId: z.string().uuid()
});

export const updateReservationSchema = z.object({
  customerName: z.string().min(3).optional(),
  customerPhone: z.string().min(8).optional(),
  customerEmail: z.string().email().optional(),

  reservationDate: z.string().optional(),

  numberOfGuests: z.number().min(1).optional(),

  status: z.nativeEnum(ReservationStatus).optional(),

  tableId: z.string().uuid().optional()
});