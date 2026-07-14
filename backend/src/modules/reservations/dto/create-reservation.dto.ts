export interface CreateReservationDto {
  reservationDate: Date;
  numberOfGuests: number;

  tableId: string;
}