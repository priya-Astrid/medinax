import { OrderItem, pharmacyDocument } from '../models/pharmacy.model';
import { pharmacyRepository } from '../repositories/pharmacyOrder.repo';
import { AppError } from '../utils/AppError';
import { medicineRepository } from '../repositories/medicine.repo';
import mongoose, { Types } from 'mongoose';
import { medicine } from '../models/medicine.model';
export class pharmacyService {
  private Repo = new pharmacyRepository();
  async pharmacyData(data: Partial<pharmacyDocument>) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      if (!data.items || data.items.length === 0)
        throw new AppError(400, 'At least one medicine required');
      let subtotal = 0;
      const items:OrderItem[] = [];

      for (const item of data.items) {
        if (item.quantity <= 0) throw new AppError(400, 'invalid quantity');

        const medi = await medicine.findOneAndUpdate(
          {
            _id: item.medicineId,
            stock: { $gte: item.quantity },
            isDeleted: false,
            expiryDate: { $gt: new Date() },
          },
          {
            $inc: { stock: -item.quantity },
          },
          {
            new: true,
            session,
          },
        );
        if (!medi) {
          throw new AppError(400, 'medicine unavailabe or out of stock');
        }
        const itemTotal = medi.mrp * item.quantity;
        subtotal += itemTotal;
        items.push({
          medicineId: medi._id as Types.ObjectId,
          name: medi.medicineName,
          quantity: item.quantity,
          unitPrice: medi.mrp,
          totalPrice: itemTotal,
        });
      }
      data.items = items;
      data.subtotal = subtotal;
      data.tax = Number((subtotal * 0.05).toFixed(2)); // 5% GST
      data.totalAmount = data.subtotal + data.tax;
      data.orderStatus = 'PENDING';
      data.paymentStatus = 'PENDING';

      const order = await this.Repo.createPharmacyData(data, session);
      await session.commitTransaction();
      return order;
    } catch (error) {
      session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
  // async pharmacyData(data: Partial<pharmacyDocument>) {
  //   if (!data.items || data.items.length === 0)
  //     throw new AppError(400, 'At least one medicine required');
  //   let totalAmount = 0;
  //   for (const item of data.items) {
  //     if (item.quantity <= 0) throw new AppError(400, 'Invalid quantity');
  //     const medicine = await this.medicineRepo.findById(item.medicineId);
  //     if (!medicine) throw new AppError(404, 'medicine not found');
  //     if (medicine.stock < item.quantity)
  //       throw new AppError(400, 'Insufficient stock');
  //     totalAmount += medicine.mrp * item.quantity;
  //   }
  //   data.totalAmount = totalAmount;
  //   data.orderStatus = 'PENDING';
  //   return this.Repo.createPharmacyData(data);
  // }
  async getPharmacyData(query: any) {
    return this.Repo.getData(query);
  }
  async updatePharmacyData(id: string, data: Partial<pharmacyDocument>) {
    const order = await this.Repo.findById(id);
    if (!order) throw new AppError(404, 'order not found');
    if (order.orderStatus === 'COMPLETED')
      throw new AppError(400, 'completed order can not be modified');

    return this.Repo.updateData(id, data);
  }
  async isDeletedData(id: string) {
    const order = await this.Repo.findById(id);
    if (!order) throw new AppError(404, 'Order not found');
    if (order.orderStatus === 'COMPLETED')
      throw new AppError(400, 'completed order can not be deleted');
    return this.Repo.deletedData(id);
  }
}
