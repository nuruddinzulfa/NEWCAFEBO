import { ReservationStatus } from "@prisma/client";

export interface UpdateReservationDto {
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;

  reservationDate?: Date;
  numberOfGuests?: number;

  tableId?: string;

  status?: ReservationStatus;
}