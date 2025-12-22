
import { labOrder, labOrderDocument } from '../models/labOrder.model';
import { buildQuery } from '../utils/buildQuery';

export class labOrderRepository {
  async laborderCreate(data: Partial<labOrderDocument>) {
    return labOrder.create(data);
  }
  async findActiveOrder(patientId: any) {
    return labOrder.findOne({
      patientId,
      orderStatus: { $in: ['pending', 'sample-collected', 'processing'] },
      isDeleted: false,
    });
  }
  async getAllData(query: any) {
    const { filter, options } = buildQuery(query);

    const data = await labOrder.find(filter, null, options).lean();
    const total = await labOrder.countDocuments(filter);
    return {
      data,
      total,
      page: Math.ceil(options.skip / options.limit) + 1,
      totalPage: Math.ceil(total / options.limit),
    };
  }
  async SingleData(id: string) {
    return labOrder
      .findOne({ _id: id })
      .populate({ path: 'tests.testId', populate: { path: 'labcategory' } })
      .lean();
  }

  async updateData(id: string, data: Partial<labOrderDocument>) {
    return labOrder.findByIdAndUpdate(id, data, { new: true });
  }
  async statusUpdate(id: string, data: Partial<labOrderDocument>) {
    return labOrder.findByIdAndUpdate(id, data, { new: true });
  }
  async findByID(id: string) {
    return labOrder.findById(id);
  }
  async collectSampleData(id: string, data: Partial<labOrderDocument>) {
    return labOrder.findByIdAndUpdate(id, data, { new: true });
  }
  async cancelData(id: string) {
    return labOrder.findByIdAndUpdate(
      id,
      { orderStatus: 'canceled' },
      { new: true },
    );
  }
}

// PATCH /lab-order/:id/upload-report
// PATCH /lab-order/:id/test/:testId/status
// POST /lab-order/payment/webhook
// Auto Calculation of Total Amount
