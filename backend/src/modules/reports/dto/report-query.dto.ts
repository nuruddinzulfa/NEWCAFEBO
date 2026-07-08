export interface ReportQueryDto {
  startDate?: string;
  endDate?: string;
  period?: "daily" | "weekly" | "monthly";
}