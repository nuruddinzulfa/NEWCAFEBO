import { prisma } from "../../core/database/prisma";
import { UserRole } from "@prisma/client";

import { RegisterDto } from "./dto/register.dto";

export class AuthRepository {
  async createUser(
    data: RegisterDto & {
      password: string;
    }
  ) {
    return prisma.user.create({
      data: {
        ...data,
        role: UserRole.CUSTOMER
      }
    });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: {
        id
      }
    });
  }
}