import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token not found"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};