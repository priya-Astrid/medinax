import { Types } from 'mongoose';
import { LabTestDocument } from '../models/labTest.model';
import { LabCategoryRepository } from '../repositories/labCategory.repo';
import { LabTestRepository } from '../repositories/labTest.repo';
import { AppError } from '../utils/AppError';
import { LabCategory } from '../models/labCategory.model';

export class LabTestService {
  constructor(
    private categoryRepo = new LabCategoryRepository(),
    private Repository = new LabTestRepository(),
  ) {}
  async labTestCreate(data: Partial<LabTestDocument>) {
    const existing = this.Repository.findByNameCategory(
      data.name!,
      data.category!,
    );
    if (!existing)
      throw new AppError(400, 'Labtest name and category already exists');

    const existCategory = await LabCategory.findOne({
      $or: [{ slug: data.category }, { name: data.category }],
    });

    if (!existCategory) {
      throw new AppError(404, 'Invalid cateogory');
    }

    data.category = existCategory._id as Types.ObjectId;
    return this.Repository.labTestCreate(data);
  }
  async getAllData(query: any) {
    return this.Repository.getAllLabTest(query);
  }
  async singleData(id: string) {
    return this.Repository.singleData(id);
  }
  async updateData(id: string, data: Partial<LabTestDocument>) {
    const test = this.Repository.findById(id);
    if (!test) throw new AppError(404, 'Lab test not found');
    if (data.status && !['active', 'inactive'].includes(data.status))
      throw new AppError(400, 'Invalid status');
    return this.Repository.updateData(id, data);
  }
  async isSoftDelete(id: string, userId: string) {
    return this.Repository.softDelete(id, userId);
  }
}
