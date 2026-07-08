import { TableRepository } from "./table.repository";
import { CreateTableDto } from "./dto/create-table.dto";
import { UpdateTableDto } from "./dto/update-table.dto";

export class TableService {
  private tableRepository: TableRepository;

  constructor() {
    this.tableRepository = new TableRepository();
  }

  async create(data: CreateTableDto) {
    const existingTable =
      await this.tableRepository.findByTableNumber(
        data.tableNumber
      );

    if (existingTable) {
      throw new Error("Table number already exists");
    }

    return this.tableRepository.create(data);
  }

  async findAll() {
    return this.tableRepository.findAll();
  }

  async findById(id: string) {
    const table =
      await this.tableRepository.findById(id);

    if (!table) {
      throw new Error("Table not found");
    }

    return table;
  }

  async update(
    id: string,
    data: UpdateTableDto
  ) {
    const table =
      await this.tableRepository.findById(id);

    if (!table) {
      throw new Error("Table not found");
    }

    if (data.tableNumber) {
      const existingTable =
        await this.tableRepository.findByTableNumber(
          data.tableNumber
        );

      if (
        existingTable &&
        existingTable.id !== id
      ) {
        throw new Error("Table number already exists");
      }
    }

    return this.tableRepository.update(id, data);
  }

  async delete(id: string) {
    const table =
      await this.tableRepository.findById(id);

    if (!table) {
      throw new Error("Table not found");
    }

    return this.tableRepository.delete(id);
  }
}