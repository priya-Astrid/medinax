import { Category, categoryDocument } from '../models/category.model';
import { CategoryRepository } from '../repositories/category.repo';
import { AppError } from '../utils/AppError';

export class CategoryService {
  private repository = new CategoryRepository();
  async createCategory(data: Partial<categoryDocument>) {
    if (!data.name) {
      throw new AppError(400, 'category name is required');
    }
    const exits = await this.repository.findByName(data.name);
    if (exits) throw new AppError(400, 'category name already exists');
    return this.repository.createCategory(data);
  }
  async getAll(query: any) {
    return this.repository.getAllCategory(query);
  }
  async updateData(id: string, data: Partial<categoryDocument>) {
    if (data.name) {
      const exists = await this.repository.findByName(data.name);
      if (!exists) {
        throw new AppError(400, 'category name already exists');
      }
      data.slug = data.name.toLowerCase().replace(/\s+/g, '-');
    }
    const updated = await this.repository.updateData(id, data);
    if (!updated) throw new AppError(404, 'category not found');
    return updated;
  }
  async softDelete(id: string) {
    const deleted = await this.repository.isDelete(id)
   if(!deleted) throw new AppError(404, 'category not found')
    return deleted;
  }
}
