import { TableRepository } from "../tables/table.repository";
import { OrderRepository } from "./order.repository";

import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

export class OrderService {
  private orderRepository: OrderRepository;
  private tableRepository: TableRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.tableRepository = new TableRepository();
  }

  async create(data: CreateOrderDto) {
    const existingOrder =
      await this.orderRepository.findByOrderNumber(
        data.orderNumber
      );

    if (existingOrder) {
      throw new Error("Order number already exists");
    }

    if (data.tableId) {
      const table =
        await this.tableRepository.findById(
          data.tableId
        );

      if (!table) {
        throw new Error("Table not found");
      }

      if (!table.isActive) {
        throw new Error("Table is inactive");
      }
    }

    return this.orderRepository.create(data);
  }

  async findAll() {
    return this.orderRepository.findAll();
  }

  async findById(id: string) {
    const order =
      await this.orderRepository.findById(id);

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }

  async update(
    id: string,
    data: UpdateOrderDto
  ) {
    const order =
      await this.orderRepository.findById(id);

    if (!order) {
      throw new Error("Order not found");
    }

    if (data.tableId) {
      const table =
        await this.tableRepository.findById(
          data.tableId
        );

      if (!table) {
        throw new Error("Table not found");
      }

      if (!table.isActive) {
        throw new Error("Table is inactive");
      }
    }

    return this.orderRepository.update(
      id,
      data
    );
  }

  async delete(id: string) {
    const order =
      await this.orderRepository.findById(id);

    if (!order) {
      throw new Error("Order not found");
    }

    return this.orderRepository.delete(id);
  }
}