import {
  prescription,
  prescriptionDocument,
} from '../models/prescription.model';
import { buildQuery } from '../utils/buildQuery';

export class prescriptionRepo {
  async createData(data: Partial<prescriptionDocument>) {
    return prescription.create(data);
  }
  async findById(id: string){
    return prescription.findOne({ _id: id, isDeleted: false })
  }
  async getData(query: any) {
    const { filter, options } = buildQuery(query);
    // filter.isDeleted = false;
     const data = await prescription.find(filter, null, options)
      
      const total = await prescription.countDocuments(filter);
    return {
      data,
      total,
      page: Math.ceil(options.skip / options.limit) + 1,
      limit: options.limit,
    };
    // return prescription.find({ isDeleted : false});  // should filter out delete items by default
  }
  async updateData(id: string, data: Partial<prescriptionDocument>) {
    return prescription.findByIdAndUpdate(id, data, { new: true });
  }
  async deleteData(id: string) {
    return prescription.findByIdAndUpdate(
      id,
      { isDeleted: true , isActive: false},
      { new: true },
    );
  }
}
