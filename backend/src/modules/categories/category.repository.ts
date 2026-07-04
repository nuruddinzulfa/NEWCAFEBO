import { PrismaClient } from "@prisma/client";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

const prisma = new PrismaClient();

export class CategoryRepository {
  async create(data: CreateCategoryDto) {
    return prisma.category.create({
      data
    });
  }

  async findAll() {
    return prisma.category.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async findById(id: string) {
    return prisma.category.findUnique({
      where: {
        id
      }
    });
  }

  async findByName(name: string) {
    return prisma.category.findUnique({
      where: {
        name
      }
    });
  }

  async update(
    id: string,
    data: UpdateCategoryDto
  ) {
    return prisma.category.update({
      where: {
        id
      },
      data
    });
  }

  async delete(id: string) {
    return prisma.category.update({
      where: {
        id
      },
      data: {
        isActive: false
      }
    });
  }
}