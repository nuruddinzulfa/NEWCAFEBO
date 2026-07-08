import { ReservationStatus } from "@prisma/client";

export interface ReservationResponse {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  reservationDate: Date;
  numberOfGuests: number;
  status: ReservationStatus;
  tableId: string;
  createdAt: Date;
  updatedAt: Date;
}