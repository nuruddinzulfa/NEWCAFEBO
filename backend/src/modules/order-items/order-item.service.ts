import { MenuRepository } from "../menus/menu.repository";
import { OrderRepository } from "../orders/order.repository";
import { OrderItemRepository } from "./order-item.repository";

import { CreateOrderItemDto } from "./dto/create-order-item.dto";
import { UpdateOrderItemDto } from "./dto/update-order-item.dto";

export class OrderItemService {
  private orderItemRepository: OrderItemRepository;
  private orderRepository: OrderRepository;
  private menuRepository: MenuRepository;

  constructor() {
    this.orderItemRepository = new OrderItemRepository();
    this.orderRepository = new OrderRepository();
    this.menuRepository = new MenuRepository();
  }

  // ===========================
  // PRIVATE METHOD
  // ===========================
  private async updateOrderTotal(orderId: string) {
    const orderItems =
      await this.orderItemRepository.findByOrderId(
        orderId
      );

    const totalAmount = orderItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

    await this.orderRepository.updateTotalAmount(
      orderId,
      totalAmount
    );
  }

  // ===========================
  // CREATE
  // ===========================
  async create(data: CreateOrderItemDto) {
    const order =
      await this.orderRepository.findById(
        data.orderId
      );

    if (!order) {
      throw new Error("Order not found");
    }

    const menu =
      await this.menuRepository.findById(
        data.menuId
      );

    if (!menu) {
      throw new Error("Menu not found");
    }

    const orderItem =
      await this.orderItemRepository.create({
        ...data,
        price: menu.price
      });

    await this.updateOrderTotal(data.orderId);

    return orderItem;
  }

  // ===========================
  // FIND ALL
  // ===========================
  async findAll() {
    return this.orderItemRepository.findAll();
  }

  // ===========================
  // FIND BY ID
  // ===========================
  async findById(id: string) {
    const orderItem =
      await this.orderItemRepository.findById(id);

    if (!orderItem) {
      throw new Error("Order Item not found");
    }

    return orderItem;
  }

  // ===========================
  // UPDATE
  // ===========================
  async update(
    id: string,
    data: UpdateOrderItemDto
  ) {
    const orderItem =
      await this.orderItemRepository.findById(id);

    if (!orderItem) {
      throw new Error("Order Item not found");
    }

    const updatedOrderItem =
      await this.orderItemRepository.update(
        id,
        data
      );

    await this.updateOrderTotal(
      orderItem.orderId
    );

    return updatedOrderItem;
  }

  // ===========================
  // DELETE
  // ===========================
  async delete(id: string) {
    const orderItem =
      await this.orderItemRepository.findById(id);

    if (!orderItem) {
      throw new Error("Order Item not found");
    }

    await this.orderItemRepository.delete(id);

    await this.updateOrderTotal(
      orderItem.orderId
    );
  }
}