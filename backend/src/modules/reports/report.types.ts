export interface SalesReportResponse {
  orderNumber: string;
  customerName: string | null;
  paymentMethod: string;
  totalAmount: number;
  paidAmount: number;
  changeAmount: number;
  createdAt: Date;
}

export interface MenuReportResponse {
  menuId: string;
  totalSold: number;
  totalRevenue: number;
}

export interface ReservationReportResponse {
  customerName: string;
  tableNumber: number;
  status: string;
  reservationDate: Date;
}