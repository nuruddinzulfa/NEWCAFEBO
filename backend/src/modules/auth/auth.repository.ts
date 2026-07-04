import { PrismaClient, User } from "@prisma/client";
import { RegisterDto } from "./dto/register.dto";

const prisma = new PrismaClient();

export class AuthRepository {

  async findUserByEmail(
    email: string
  ): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  async findUserById(
    id: string
  ): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id
      }
    });
  }

  async createUser(
    data: RegisterDto
  ): Promise<User> {
    return prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        role: "ADMIN"
      }
    });
  }
}