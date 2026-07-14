import { ReservationStatus } from "@prisma/client";

export interface UpdateReservationDto {
  reservationDate?: Date;
  numberOfGuests?: number;

  tableId?: string;

  status?: ReservationStatus;
}