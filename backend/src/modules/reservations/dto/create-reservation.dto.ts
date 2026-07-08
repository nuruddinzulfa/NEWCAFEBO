export interface CreateReservationDto {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;

  reservationDate: Date;
  numberOfGuests: number;

  tableId: string;
}