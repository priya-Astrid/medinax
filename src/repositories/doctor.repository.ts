import { PaginationDto } from '../dtos/common/request.dto';
import { Doctor, DoctorDocument } from '../models/doctor.model';
import { buildQuery } from '../utils/buildQuery';

export class DoctorRepository {
  async create(data: Partial<DoctorDocument>): Promise<DoctorDocument> {
    return await Doctor.create(data);
  }
  async find(query: any) {
    const { filter, options } = buildQuery(query);
    const data = await Doctor.find(filter, null, options);

    const total = await Doctor.countDocuments(filter);
    return {
      data,
      total,
      page: options.skip / options.limit + 1,
      limit: options.limit,
    };

    // return await Doctor.find();
  }
  async findDoctorById(id: string) {
    return await Doctor.findById(id);
  }
  async findById(id: string): Promise<DoctorDocument | null> {
    return await Doctor.findById(id).populate(
      'userId',
      'firstname lastname email',
    );
  }
  // async getAllDoctorData(pagination: PaginationDto = {}): Promise<{
  //   data: DoctorDocument[];
  //   total: number;
  //   page: number;
  //   limit: number;
  // }> {
  //   const {
  //     page = 1,
  //     limit = 10,
  //     sortBy = 'createdAt',
  //     sortOrder = 'desc',
  //   } = pagination;
  //   const skip = (page - 1) * limit;
  //   const sortDirection = sortOrder === 'asc' ? 1 : -1;

  //   const total = await Doctor.countDocuments();
  //   const data = await Doctor.find()
  //     .sort({ [sortBy]: sortDirection })
  //     .skip(skip)
  //     .limit(limit);

  //   return { data, total, page, limit };
  // }
  async findByIdUpdate(
    id: string,
    data: Partial<DoctorDocument>,
  ): Promise<DoctorDocument | null> {
    return await Doctor.findByIdAndUpdate(id, data, { new: true });
  }
  async softDeleteById(id: string, adminId: string) {
    return await Doctor.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        DeletedAt: new Date(),
        DeletedBy: adminId,
      },
      { new: true },
    );
  }
  async findByIdDelete(id: string): Promise<DoctorDocument | null> {
    return await Doctor.findByIdAndDelete(id);
  }
  async upsertByUserId(userId: string, update: Partial<DoctorDocument>) {
    return await Doctor.findOneAndUpdate({ userId }, update, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
  }
  async findData(filter: any): Promise<DoctorDocument[]> {
    const query: any = {};
    if (filter.specialization) {
      query.specialization = { $regex: filter.specialization, $options: 'i' };
    }
    //  if(filter.availableDays){
    //   query.availableDays ={$in:filter.availableDays};
    //  }
    if (filter.availableDays) {
      query.availableDays = {
        $in: Array.isArray(filter.availableDays)
          ? filter.availableDays
          : [filter.availableDays],
      };
    }
    return await Doctor.find(query);
  }
  async doctorSpecialize(specialization: string) {
    return await Doctor.find({ specialization: specialization });
  }
}
