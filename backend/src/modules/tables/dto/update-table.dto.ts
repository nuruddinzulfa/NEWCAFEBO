import { TableStatus } from "@prisma/client";

export interface UpdateTableDto {
  tableNumber?: number;
  capacity?: number;
  qrCode?: string;
  status?: TableStatus;
  isActive?: boolean;
}