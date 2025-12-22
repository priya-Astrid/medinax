import { any, exist } from 'joi';
import { medicineDocument } from '../models/medicine.model';
import { medicineRepository } from '../repositories/medicine.repo';
import { AppError } from '../utils/AppError';
import { Category } from '../models/category.model';
import { Types } from 'mongoose';

export class MedicineService {
  private Repository = new medicineRepository();
  async createMedicine(data: Partial<medicineDocument>) {
    if (!data.medicineName || typeof data.medicineName !== 'string')
      throw new AppError(400, 'medicine name is required');

    if (!data.category) throw new AppError(400, ' category is required');

    if (data.expiryDate) {
      const expiry = new Date(data.expiryDate);
      if (expiry <= new Date())
        throw new AppError(400, 'expired medicine can not allowed');
    }

    if (data.mrp! < data.purchasPrice!)
      throw new AppError(400, 'mrp must be greater than purches price');

    const exists = await this.Repository.findByName(data.medicineName);
    if (exists) throw new AppError(400, 'medicine already exists');

    const categoryData = await Category.findOne({
      $or: [{ slug: data.category }, { name: data.category }],
    });

    if (!categoryData) throw new AppError(400, 'Invalid Category');
    data.category = categoryData._id as Types.ObjectId;
    return this.Repository.createMedicine(data);
  }
  async getAllMedicine(query: any) {
    return this.Repository.getAllMedicine(query);
  }
  async updateMedicine(id: string, data: Partial<medicineDocument>) {
    const medicine = await this.Repository.getMedicineById(id);
    if (!medicine) throw new AppError(404, 'medicine not found');

    if (medicine.expiryDate && new Date(medicine.expiryDate) <= new Date())
      throw new AppError(400, 'Expired medicine can not be updated');

    if (data.stock && data.stock < 0) {
      throw new AppError(400, 'stock can not ne nagative');
    }
    return this.Repository.updateData(id, data);
  }
  async softDelete(id: string) {
    return this.Repository.softDeleteData(id);
  }
  async getMedicine(id: string) {
    return this.Repository.getSingleMedicine(id);
  }

  async searchData(query: any) {
    return this.Repository.searchData(query);
  }
  async restoreData(id: string) {
    return this.Repository.restoreData(id);
  }
  async lowStock(threshold = 10) {
    return this.Repository.lowStockList(threshold);
  }
  async expirySoon(days = 30) {
    return this.Repository.expirySoon(days);
  }
  async expired() {
    return this.Repository.expired();
  }
  async AddStock(id: string, qty: number) {
    if (qty <= 0) throw new AppError(404, 'Quantity must be > 0');

    const medicine = await this.Repository.getMedicineById(id);
    if (!medicine) throw new AppError(404, 'medicine not found');
    if (medicine.expiryDate && new Date(medicine.expiryDate) <= new Date())
      throw new AppError(400, 'expired medicine can not be added');
    return this.Repository.addstock(id, qty);
  }
  async reduceStock(id: string, qty: number) {
    if (qty <= 0) throw new AppError(400, 'Quantity must be > 0 ');
    const medicine = await this.Repository.getMedicineById(id);
    if (!medicine) throw new AppError(404, 'medicine not found');
    if (medicine.expiryDate && new Date(medicine.expiryDate) <= new Date())
      throw new AppError(400, 'expired medicine can not be sold');
    if (medicine.stock < qty) throw new AppError(400, 'Inefficient stock');
    return this.Repository.reduceStock(id, qty);
  }
}

// at that time i prepare a node js interview  for big mnc company
