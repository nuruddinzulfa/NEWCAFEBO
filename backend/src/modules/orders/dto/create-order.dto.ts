export interface CreateOrderDto {
  orderNumber: string;
  customerName?: string;
  customerPhone?: string;
  tableId?: string;
}