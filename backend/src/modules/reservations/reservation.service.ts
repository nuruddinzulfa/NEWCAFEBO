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

    // Cek apakah jumlah orang sesuai kapasitas meja
    if (data.numberOfGuests > table.capacity) {
      throw new Error(
        `Jumlah orang (${data.numberOfGuests}) melebihi kapasitas meja (${table.capacity} Orang). Silakan pilih meja yang sesuai.`
      );
    }

    return this.reservationRepository.create(data);
  }

  async findAll() {
    return this.reservationRepository.findAll();
  }

  async findUpcoming() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
    return this.reservationRepository.findUpcoming(startOfDay, endDate);
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

      // Cek apakah jumlah orang sesuai kapasitas meja baru
      const guests = data.numberOfGuests ?? reservation.numberOfGuests;
      if (guests > table.capacity) {
        throw new Error(
          `Jumlah orang (${guests}) melebihi kapasitas meja (${table.capacity} Orang). Silakan pilih meja yang sesuai.`
        );
      }
    } else if (data.numberOfGuests) {
      // Jika hanya ganti jumlah orang tanpa ganti meja, tetap validasi kapasitas
      const table =
        await this.tableRepository.findById(
          reservation.tableId
        );

      if (table && data.numberOfGuests > table.capacity) {
        throw new Error(
          `Jumlah orang (${data.numberOfGuests}) melebihi kapasitas meja (${table.capacity} Orang). Silakan pilih meja yang sesuai.`
        );
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