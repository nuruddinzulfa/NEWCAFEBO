import { CategoryRepository } from "../categories/category.repository";
import { MenuRepository } from "./menu.repository";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";

export class MenuService {
  private menuRepository: MenuRepository;
  private categoryRepository: CategoryRepository;

  constructor() {
    this.menuRepository = new MenuRepository();
    this.categoryRepository = new CategoryRepository();
  }

  async create(data: CreateMenuDto) {
    const existingMenu =
      await this.menuRepository.findByName(data.name);

    if (existingMenu) {
      throw new Error("Menu already exists");
    }

    const category =
      await this.categoryRepository.findById(
        data.categoryId
      );

    if (!category) {
      throw new Error("Category not found");
    }

    return this.menuRepository.create(data);
  }

  async findAll() {
    return this.menuRepository.findAll();
  }

  async findRecommended() {
    return this.menuRepository.findRecommended();
  }

  async findById(id: string) {
    const menu =
      await this.menuRepository.findById(id);

    if (!menu) {
      throw new Error("Menu not found");
    }

    return menu;
  }

  async update(
    id: string,
    data: UpdateMenuDto
  ) {
    const menu =
      await this.menuRepository.findById(id);

    if (!menu) {
      throw new Error("Menu not found");
    }

    if (data.name) {
      const existingMenu =
        await this.menuRepository.findByName(data.name);

      if (
        existingMenu &&
        existingMenu.id !== id
      ) {
        throw new Error("Menu already exists");
      }
    }

    if (data.categoryId) {
      const category =
        await this.categoryRepository.findById(
          data.categoryId
        );

      if (!category) {
        throw new Error("Category not found");
      }
    }

    return this.menuRepository.update(id, data);
  }

  async delete(id: string) {
    const menu =
      await this.menuRepository.findById(id);

    if (!menu) {
      throw new Error("Menu not found");
    }

    return this.menuRepository.delete(id);
  }
}