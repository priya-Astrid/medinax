import { LabCategory, labCategoryDocument } from '../models/labCategory.model';
import { buildQuery } from '../utils/buildQuery';

export class LabCategoryRepository {
  async findByName(name: string) {
    return LabCategory.findOne({ name });
  }
  async findById(id: string) {
    return LabCategory.findById(id);
  }
  async createLabcategory(data: Partial<labCategoryDocument>) {
    return LabCategory.create(data);
  }
  async dropdownData() {
    return LabCategory.find(
      { isDeleted: false, isActive: true },
      {
        _id: 1,
        name: 1,
      },
    ).sort({ name: 1});
  }
  async getAllData(query: any) {
    const { filter, options } = buildQuery(query, ['name', 'slug']);
    // filter.isDeleted = false;

    const data = await LabCategory.find(filter, null, options).lean();
    const total = await LabCategory.countDocuments(filter);
    return {
      data,
      total,
      page: Math.ceil(options.skip / options.limit) + 1,
      totalPage: Math.ceil(total / options.limit),
    };
  }

  async UpdateData(id: string, data: Partial<labCategoryDocument>) {
    return LabCategory.findByIdAndUpdate(id, data, { new: true });
  }

  async SoftDeleteData(id: string) {
    return LabCategory.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
  }
}
