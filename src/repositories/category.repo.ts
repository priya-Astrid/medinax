import { Category, categoryDocument } from '../models/category.model';
import { buildQuery } from '../utils/buildQuery';

export class CategoryRepository {
  async findByName(name: string) {
    return Category.findOne({ name });
  }
  async createCategory(data: Partial<categoryDocument>) {
    return Category.create(data);
  }
  async getAllCategory(query: any) {
    const { filter, options } = buildQuery(query);
    //  filter.isDeleted = false;

    const data = await Category.find(filter, null, options).lean();
    const total = await Category.countDocuments(filter);
    return {
      data,
      total,
      page: options.skip / options.limit + 1,
      totalPage: total / options.limit,
    };
  }
  async updateData(id: string, data: Partial<categoryDocument>) {
    return Category.findByIdAndUpdate(id, data, { new: true });
  }
  async isDelete(id: string, userId: string) {
    return Category.findByIdAndUpdate(
      id,
      { isDeleted: true, 
        isActive: false,
        DeletedBy:userId,
        DeletedAt: new Date(),
     },
      { new: true },
    );
  }
}
