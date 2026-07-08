import { z } from "zod";

export const ReportQuerySchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  period: z
    .enum(["daily", "weekly", "monthly"])
    .optional()
});