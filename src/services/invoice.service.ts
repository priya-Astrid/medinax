import { Types } from 'mongoose';
import { Doctor } from '../models/doctor.model';
import { invoiceDocument } from '../models/invoice.model';
import { LabTest } from '../models/labTest.model';
import { medicine } from '../models/medicine.model';
import { InvoiceRepository } from '../repositories/invoice.repo';
import { AppError } from '../utils/AppError';
import { genetateInvoiceNo } from '../utils/generateInvoiceNo';
export class InvoiceService {
  private Repo = new InvoiceRepository();
  async createInvoice(data: {
    items:{
      type: 'medicine'|'labtest'|'consultation';
      refId:string;
      quantity?:number;
    }[];
    discount?:number;
  }) {
    let subTotal = 0;
    const items:invoiceDocument['items'] = [];

    for (const item of data.items) {
      switch (item.type) {
        case 'medicine': {
          const medi = await medicine.findById(item.refId);
          if (!medi) throw new AppError(404, 'medicine not found');

          const quantity = Number(item.quantity) || 1;
          const unitPrice = Number(medi.mrp);
          const total = unitPrice * quantity;

          items.push({
            type: 'medicine',
            refId: medi._id as Types.ObjectId,
            description: medi.medicineName,
            quantity,
            unitPrice: medi.mrp,
            total,
          });
          subTotal += total;

          break;
        }
        case 'labtest': {
          const labtest = await LabTest.findById(item.refId);
          if (!labtest) throw new AppError(404, 'labtest not found');

          const total = labtest.price;
          items.push({
            type: 'labtest',
            refId: labtest._id as Types.ObjectId,
            description: labtest.name,
            quantity: 1,
            unitPrice: labtest.price,
            total,
          });
          subTotal += total;
          break;
        }
        case 'consultation': {
          const doctor = await Doctor.findById(item.refId);
          if (!doctor) throw new AppError(404, 'doctor not found');

          const fees = Number(doctor.consultationFees);
          items.push({
            type: 'consultation',
            refId: doctor._id as Types.ObjectId,
            description: 'consultation with Doctor',
            quantity: 1,
            unitPrice: fees,
            total: fees,
          });
          subTotal += fees;
          break;
        }
        default:
          throw new AppError(400, 'invalid invoice data');
      }
      // return this.Repo.createInvoice(data);
    }
    const discount = data.discount || 0;
    const tax = subTotal * 0.05;
    const grandTotal = subTotal + tax - discount;

    const invoiceNo = await genetateInvoiceNo();
    return this.Repo.createInvoice({
      ...data,
      items,
      invoiceNo,
      subtotal: subTotal,
      tax,
      grandTotal,
    });
  }
  async getAllInvoice() {
    return this.Repo.getInvoiceData();
  }
  async singleInvoiceData(id: string) {
    return this.Repo.getSingleInvoice(id);
  }
  async updateStatus(id: string, status: 'pending' | 'paid' | 'cancelled' | 'partial') {
    return this.Repo.updateStatus(id, status);
  }
  async isSoftDeleted(id: string, userId: string) {
    return this.Repo.isSoftDelete(id, userId);
  }
  async restoreData(id: string) {
    return this.Repo.restoreInvoice(id);
  }
}
