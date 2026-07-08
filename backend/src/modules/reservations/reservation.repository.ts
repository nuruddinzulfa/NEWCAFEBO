import { PrismaClient } from "@prisma/client";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";

const prisma = new PrismaClient();

export class ReservationRepository {
  async create(data: CreateReservationDto) {
    return prisma.reservation.create({
      data,
      include: {
        table: true
      }
    });
  }

  async findAll() {
    return prisma.reservation.findMany({
      include: {
        table: true
      },
      orderBy: {
        reservationDate: "asc"
      }
    });
  }

  async findById(id: string) {
    return prisma.reservation.findUnique({
      where: {
        id
      },
      include: {
        table: true
      }
    });
  }

  async update(
    id: string,
    data: UpdateReservationDto
  ) {
    return prisma.reservation.update({
      where: {
        id
      },
      data,
      include: {
        table: true
      }
    });
  }

  async delete(id: string) {
    return prisma.reservation.delete({
      where: {
        id
      }
    });
  }
}