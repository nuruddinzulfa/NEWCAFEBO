import { Menu } from "@prisma/client";

export type MenuResponse = Omit<Menu, "isDeleted">;