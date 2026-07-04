import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AuthRepository } from "./auth.repository";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(data: RegisterDto) {
    const existingUser = await this.authRepository.findUserByEmail(
      data.email
    );

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.authRepository.createUser({
      ...data,
      password: hashedPassword
    });

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    };
  }

  async login(data: LoginDto) {
    const user = await this.authRepository.findUserByEmail(
      data.email
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordMatch = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new Error("Invalid credentials");
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d"
      }
    );

    return {
      accessToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    };
  }

  async getProfile(userId: string) {
    const user = await this.authRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role
    };
  }
}