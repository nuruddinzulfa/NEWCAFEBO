export interface OrderItemResponse {
  id: string;
  orderId: string;
  menuId: string;
  quantity: number;
  price: number;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}