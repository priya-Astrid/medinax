import { LabTest, LabTestDocument } from '../models/labTest.model';
import { buildQuery } from '../utils/buildQuery';

export class LabTestRepository {
  async findByNameCategory(name: string, categoryId: any) {
    return LabTest.findOne({ name, categoryId, isDeleted: false });
  }
  async findById(id: string) {
    return LabTest.findOne({ _id: id, isDeleted: false });
  }
  async labTestCreate(data: Partial<LabTestDocument>) {
    return LabTest.create(data);
  }

  async getAllLabTest(query: any) {
    const { filter, options } = buildQuery(query);
    // filter.isDeleted = false
    const data = await LabTest.find(filter, null, options).lean();
    const total = await LabTest.countDocuments(filter);
    return {
      data,
      total,
      page: Math.ceil(options.skip / options.limit) + 1,
      totalPage: Math.ceil(total / options.limit),
    };
    // return LabTest.find()
  }
  async singleData(id: string) {
    return LabTest.findOne({ _id: id, isDeleted: false }).populate('patientId');
  }
  async updateData(id: string, data: Partial<LabTestDocument>) {
    return LabTest.findByIdAndUpdate({ _id: id, isDeleted: false }, data, {
      new: true,
    });
  }
  async softDelete(id: string, userId: string) {
    return LabTest.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        isActive: false,
        DeletedBy: userId,
        DeletedAt: new Date(),
      },
      { new: true },
    );
  }
}
