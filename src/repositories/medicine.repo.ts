import { ObjectId } from 'mongoose';
import { medicine, medicineDocument } from '../models/medicine.model';
import { buildQuery } from '../utils/buildQuery';

export class medicineRepository {
  async findById(id: ObjectId) {
    return medicine.findById(id);
  }
  async findByName(medicineName: any) {
    return medicine.findOne({ medicineName });
  }
  async createMedicine(data: Partial<medicineDocument>) {
    return medicine.create(data);
  }
  async getAllMedicine(query: any) {
    const { filter, options } = buildQuery(query);
    // filter.isDeleted = false;
    const data = await medicine
      .find(filter, null, options)
    
    const total = await medicine.countDocuments(filter);

    return {
      data,
      total,
      page: Math.ceil(options.skip / options.limit) + 1,
      totalPage: Math.ceil(total / options.limit),
    };
  }
  async getMedicineById(id: string) {
    return medicine.findOne({ _id: id });
  }

  async getSingleMedicine(id: string) {
    return medicine.findOne({ _id: id }).populate('category');
  }
  async updateData(id: string, data: Partial<medicineDocument>) {
    return medicine.findByIdAndUpdate(id, data, { new: true });
  }
  async softDeleteData(id: string) {
    return medicine.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }
  async searchData(query: any) {
    const filter: any = {};
    if (query.medicineName) {
      filter.medicineName = { $regex: query.medicineName, $options: 'i' };
    }
    return await medicine.find(filter);
  }
  async restoreData(id: string) {
    return await medicine.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { new: false },
    );
  }
  async lowStockList(threshold = 10) {
    return await medicine
      .find({ stock: { $lt: threshold }, isDeleted: false })
      .lean();
  }
  async expirySoon(days = 30) {
    const now = new Date();
    const future = new Date();
    future.setDate(now.getDate() + days);
    return medicine
      .find({ expiryDate: { $lte: future, $gte: now }, isDeleted: false })
      .lean();
  }
  async expired() {
    return medicine
      .find({ expiryDate: { $lt: new Date() }, isDeleted: false })
      .lean();
  }
  async addstock(id: string, quantity: number) {
    return medicine.findByIdAndUpdate(
      id,
      { $inc: { stock: quantity } },
      { new: true },
    );
  }
  async reduceStock(id: string, quantity: number) {
    return medicine.findByIdAndUpdate(
      { _id: id, stock: { $gte: quantity } },
      { $inc: { stock: -quantity } },
      { new: true },
    );
  }
}
