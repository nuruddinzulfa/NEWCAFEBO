import { z } from "zod";
import { ReservationStatus } from "@prisma/client";

export const createReservationSchema = z.object({
  reservationDate: z.string(),

  numberOfGuests: z.number().min(1),

  tableId: z.string().uuid()
});

export const updateReservationSchema = z.object({
  reservationDate: z.string().optional(),

  numberOfGuests: z.number().min(1).optional(),

  status: z.nativeEnum(ReservationStatus).optional(),

  tableId: z.string().uuid().optional()
});