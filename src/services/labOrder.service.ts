import { labOrderDocument } from '../models/labOrder.model';
import { labOrderRepository } from '../repositories/labOrder.repo';
import { AppError } from '../utils/AppError';

export class labOrderServices {
  private Repository = new labOrderRepository();
  async createLabOrder(data: Partial<labOrderDocument>) {
    const exicting = await this.Repository.findActiveOrder(data.patientId);
    if (exicting) throw new AppError(400, 'Duplicate Lab Test not allow');
    data.orderStatus = 'pending';

    return this.Repository.laborderCreate(data);
  }
  async getAllData(query: any) {
    return this.Repository.getAllData(query);
  }
  async singleData(id: string) {
    return this.Repository.SingleData(id);
  }
  async updateData(id: string, data: Partial<labOrderDocument>) {
    const order = await this.Repository.findByID(id);
    if (!order) throw new AppError(404, 'order not found');

    if (order.orderStatus === 'completed')
      throw new AppError(400, 'completed order con not be modified');
    return this.Repository.updateData(id, data);
  }
  async statusUpdate(id: string, status: string, role: string) {
    const validStatus = [
      'pending',
      'processing',
      'sample-collected',
      'completed',
      'canceled',
    ];

    const order = await this.Repository.findByID(id);
    if (!order) throw new AppError(404, 'order not found');
    const allowedTransitions: any = {
      pending: ['sample-collected', 'canceled'],
      'sample-collected': ['processing'],
      processing: ['completed'],
    };
    if (!allowedTransitions[order.orderStatus]?.includes(status)) {
      throw new AppError(400, 'Invalid Status transition');
    }
    if (!validStatus.includes(status))
      throw new AppError(404, 'status not match');
    // if (status === 'completed' && user.role !== 'admin')
    if (status === 'completed'&& role !== "admin") throw new AppError(403, 'not authorized');
    const statusData = await this.Repository.statusUpdate(id, {orderStatus: status});
    return statusData;
  }
  async cancelData(id: string) {
    const order = await this.Repository.findByID(id);
    if (!order) throw new AppError(404, 'Lab Order not found');
    if (!['pending', 'sample-collected'].includes(order.orderStatus)) {
      throw new AppError(400, 'order can not be cancelled');
    }
    return this.Repository.cancelData(id);
  }
  async collectSimpleData(id: string, data: Partial<labOrderDocument>) {
    const order = await this.Repository.findByID(id);
    if (!order) throw new AppError(400, 'sample not found');

    if (order.orderStatus !== 'pending')
      throw new AppError(400, 'sample already collected');
    return this.Repository.collectSampleData(id, {
      ...data,
      orderStatus: 'sample-collected',
    });
  }
  async startaprocessing(id: string) {
    const order = await this.Repository.findByID(id);
    if (!order) throw new AppError(404, 'Order not found');

    if (order.orderStatus !== 'sample-collected')
      throw new AppError(400, 'can not start before sample-collect');
    return this.Repository.updateData(id, { orderStatus: 'processing' });
  }
}
