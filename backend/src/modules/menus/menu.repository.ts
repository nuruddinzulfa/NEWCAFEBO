import { PrismaClient } from "@prisma/client";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";

const prisma = new PrismaClient();

export class MenuRepository {
  async create(data: CreateMenuDto) {
    return prisma.menu.create({
      data
    });
  }

  async findAll() {
    return prisma.menu.findMany({
      where: {
        isDeleted: false
      },
      include: {
        category: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async findRecommended() {
    return prisma.menu.findMany({
      where: {
        isDeleted: false,
        isRecommended: true,
        isAvailable: true
      },
      include: {
        category: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async findById(id: string) {
    return prisma.menu.findUnique({
      where: {
        id
      },
      include: {
        category: true
      }
    });
  }

  async findByName(name: string) {
    return prisma.menu.findFirst({
      where: {
        name,
        isDeleted: false
      }
    });
  }

  async update(
    id: string,
    data: UpdateMenuDto
  ) {
    return prisma.menu.update({
      where: {
        id
      },
      data
    });
  }

  async delete(id: string) {
    return prisma.menu.update({
      where: {
        id
      },
      data: {
        isDeleted: true
      }
    });
  }
}