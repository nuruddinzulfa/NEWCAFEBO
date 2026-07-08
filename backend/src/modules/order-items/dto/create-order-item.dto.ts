export interface CreateOrderItemDto {
  orderId: string;
  menuId: string;
  quantity: number;
  notes?: string;
}