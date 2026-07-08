export interface DashboardQueryDto {
  startDate?: string;
  endDate?: string;
  period?: "today" | "weekly" | "monthly";
}