import { ReservationRepository } from "./reservation.repository";
import { TableRepository } from "../tables/table.repository";

import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";

export class ReservationService {
  private reservationRepository: ReservationRepository;
  private tableRepository: TableRepository;

  constructor() {
    this.reservationRepository = new ReservationRepository();
    this.tableRepository = new TableRepository();
  }

  async create(data: CreateReservationDto) {
    const table = await this.tableRepository.findById(
      data.tableId
    );

    if (!table) {
      throw new Error("Table not found");
    }

    // Cek apakah meja masih aktif
    if (!table.isActive) {
      throw new Error("Table is inactive");
    }

    return this.reservationRepository.create(data);
  }

  async findAll() {
    return this.reservationRepository.findAll();
  }

  async findById(id: string) {
    const reservation =
      await this.reservationRepository.findById(id);

    if (!reservation) {
      throw new Error("Reservation not found");
    }

    return reservation;
  }

  async update(
    id: string,
    data: UpdateReservationDto
  ) {
    const reservation =
      await this.reservationRepository.findById(id);

    if (!reservation) {
      throw new Error("Reservation not found");
    }

    // Jika ingin mengganti meja
    if (data.tableId) {
      const table =
        await this.tableRepository.findById(
          data.tableId
        );

      if (!table) {
        throw new Error("Table not found");
      }

      // Cek apakah meja masih aktif
      if (!table.isActive) {
        throw new Error("Table is inactive");
      }
    }

    return this.reservationRepository.update(
      id,
      data
    );
  }

  async delete(id: string) {
    const reservation =
      await this.reservationRepository.findById(id);

    if (!reservation) {
      throw new Error("Reservation not found");
    }

    return this.reservationRepository.delete(id);
  }
}