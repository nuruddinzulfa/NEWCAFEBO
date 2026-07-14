import { ReservationStatus } from "@prisma/client";

export interface ReservationResponse {
  id: string;
  reservationDate: Date;
  numberOfGuests: number;
  status: ReservationStatus;
  tableId: string;
  createdAt: Date;
  updatedAt: Date;
}