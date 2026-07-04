export interface CreateMenuDto {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId: string;
}