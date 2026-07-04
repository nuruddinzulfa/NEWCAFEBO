import { CategoryRepository } from "./category.repository";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async create(data: CreateCategoryDto) {
    const existingCategory =
      await this.categoryRepository.findByName(data.name);

    if (existingCategory) {
      throw new Error("Category already exists");
    }

    return this.categoryRepository.create(data);
  }

  async findAll() {
    return this.categoryRepository.findAll();
  }

  async findById(id: string) {
    const category =
      await this.categoryRepository.findById(id);

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }

  async update(
    id: string,
    data: UpdateCategoryDto
  ) {
    const category =
      await this.categoryRepository.findById(id);

    if (!category) {
      throw new Error("Category not found");
    }

    if (data.name) {
      const existingCategory =
        await this.categoryRepository.findByName(data.name);

      if (
        existingCategory &&
        existingCategory.id !== id
      ) {
        throw new Error("Category name already exists");
      }
    }

    return this.categoryRepository.update(id, data);
  }

  async delete(id: string) {
    const category =
      await this.categoryRepository.findById(id);

    if (!category) {
      throw new Error("Category not found");
    }

    return this.categoryRepository.delete(id);
  }
}