import mongoose from 'mongoose';
import { pharmacy, pharmacyDocument } from '../models/pharmacy.model';
import { AppError } from '../utils/AppError';
import { buildQuery } from '../utils/buildQuery';

export class pharmacyRepository {
    async findById(id: string){
        return await pharmacy.findById(id);
    }
  async createPharmacyData(data: Partial<pharmacyDocument>, session: mongoose.ClientSession) {
    const result = await pharmacy.create([data],{session});
   return result[0]
    // return await pharmacy.create(data);

  }
  async getData(query: any) {
    const { filter, options } = buildQuery(query);
    const data = await pharmacy.find(filter, null, options);
    const total = await pharmacy.countDocuments(filter);
    return {
      data,
      total,
      page: Math.ceil(options.skip / options.limit) + 1,
      limit: options.limit,
      totalPage: Math.ceil(total / options.limit),
    };
    // return await pharmacy.find();
  }
  async updateData(id: string, data: Partial<pharmacyDocument>) {
    return await pharmacy.findByIdAndUpdate(id, data, { new: true });
  }
  async deletedData(id: string) {
     return  pharmacy.findByIdAndUpdate(id,{isDelete: true},{ new: true });
  }
}
