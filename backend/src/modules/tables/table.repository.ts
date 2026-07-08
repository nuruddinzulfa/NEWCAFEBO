import { PrismaClient } from "@prisma/client";
import { CreateTableDto } from "./dto/create-table.dto";
import { UpdateTableDto } from "./dto/update-table.dto";

const prisma = new PrismaClient();

export class TableRepository {
  async create(data: CreateTableDto) {
    return prisma.restaurantTable.create({
      data
    });
  }

  async findAll() {
    return prisma.restaurantTable.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        tableNumber: "asc"
      }
    });
  }

  async findById(id: string) {
    return prisma.restaurantTable.findUnique({
      where: {
        id
      }
    });
  }

  async findByTableNumber(tableNumber: number) {
    return prisma.restaurantTable.findUnique({
      where: {
        tableNumber
      }
    });
  }

  async update(
    id: string,
    data: UpdateTableDto
  ) {
    return prisma.restaurantTable.update({
      where: {
        id
      },
      data
    });
  }

  async delete(id: string) {
    return prisma.restaurantTable.update({
      where: {
        id
      },
      data: {
        isActive: false
      }
    });
  }
}