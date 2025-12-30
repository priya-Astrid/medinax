import { medicalHistory } from '../models/medicalHistory.model';
import { buildQuery } from '../utils/buildQuery';

export class MedicalHistoryRepo {
  async createMedicaHistory(data: any) {
    return await medicalHistory.create(data);
  }
  async findByAppointmentid(appointmentId: string) {
    return await medicalHistory.findOne({ appointmentId });
  }
  async findExistingVisit(
    patientId: string,
    doctorId: string,
    start: Date,
    end: Date,
  ) {
    return await medicalHistory.findOne({
      patientId,
      doctorId,
      visitDate: { $gte: start, $lte: end },
    });
  }
  async findData(query: any) {
    const { filter, options } = buildQuery(query);

    const data = await medicalHistory.find(filter, null, options).lean();
    const total = await medicalHistory.countDocuments(filter);
    const page = options.page ?? 1;
    return {
      data,
      total,
      page,
      // page: Math.ceil(options.skip/options.limit)+1,
      limit: options.limit,
      totalPage: Math.ceil(total / options.limit),
    };
    // return await medicalHistory.find();
  }
  async findOneData(id: string) {
    return await medicalHistory.findById(id);
  }
  async updateData(id: string, data: any) {
    return await medicalHistory.findByIdAndUpdate(id, data, { new: true });
  }
  async searchData(query: any) {
    const { filter, options } = buildQuery(query);

    if (query.patientId) filter.patientId = query.patientId;
    if (query.doctorId) filter.doctorId = query.doctorId;
    if (query.diagnosis) {
      const keyword = query.diagnosis.trim().split(/\s+/).join('.*');
      filter.diagnosis = { $regex: keyword, $options: 'i' };
    }

    const totalRecords = await medicalHistory.countDocuments(filter);

    const record = await medicalHistory
      .find(filter)
      .skip(options.skip)
      .limit(options.limit)
      .sort(options.sort);

    return {
      record,
      pagination: {
        totalRecords,
        page: options.page,
        limit: options.limit,
        totalPages: Math.ceil(totalRecords / options.limit),
      },
    };
  }
  async softDeleteData(id: string) {
    return medicalHistory.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
  }
  async restoreData(id: string){
    return medicalHistory.findByIdAndUpdate(id, {isDeleted: false},{new: true})
  }
  // async searchData(query: any) {
  //   const filter: any = {};
  //   if (query.patientId) filter.patientId = query.patientId;
  //   if (query.doctorId) filter.doctorId = query.doctorId;
  //   if (query.diagnosis) {
  //     const keyword = query.diagnosis.trim().split(/\s+/).join('.*');
  //     filter.diagnosis = { $regex: keyword, $options: 'i' };
  //   }

  //   const page = parseInt(query.page) || 1;
  //   const limit = parseInt(query.limit) || 10;
  //   const skip = (page - 1) * limit;

  //   const sort: any = {};
  //   if (query.sort) sort[query.sort] = 1;

  //   const data = await medicalHistory
  //     .find(filter)
  //     .skip(skip)
  //     .limit(limit)
  //     .sort(sort);
  //   const total = await medicalHistory.countDocuments(filter);
  //   return {
  //     data,
  //     pagination: {
  //       page,
  //       limit,
  //       total,
  //       totalPages: Math.ceil(total / limit),
  //     },
  //   };
  // }
}
