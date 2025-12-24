import { Patient, PatientDocument } from '../models/patient.model';
import { buildQuery } from '../utils/buildQuery';

export class PatientRepository {
  async create(data: Partial<PatientDocument & { authUserId: any }>) {
    return Patient.create(data);
  }
  async getByIdUser(userId: string){
    return await Patient.findById(userId);
  }
  async findAll(query: any) {
    const { filter, options } = buildQuery(query);
    // isDeleted: false;
    const data = await Patient.find(filter, null, options);

    const total = await Patient.countDocuments(filter);
    return {
      data,
      total,
      page: Math.ceil(options.skip / options.limit) + 1,
      limit: options.limit,
    };
    // return await Patient.find();
  }

  async findByUserId(userId: string) {
    return await Patient.findOne({ userId: userId }).populate('userId');
  }

  async updateByUserId(userId: string, update: Partial<PatientDocument>) {
    return await Patient.findOneAndUpdate({ userId: userId }, update, {
      new: true,
      upsert: false,
    });
  }

  async upsertByUserId(userId: string, update: Partial<PatientDocument>) {
    return await Patient.findOneAndUpdate({ userId: userId }, update, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
  }
  async deletePatient(deleteId: string, userId: string) {
    return await Patient.findByIdAndUpdate(
      { _id: deleteId, createdBy: userId },
      {
        isDeleted: true,
        isActive: false,
        DeletedBy: userId,
        DeletedAt: new Date(),
      },
      { new: true },
    );
  }
  async restoreData(id: string) {
    return await Patient.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
        isActive:true,
        DeletedBy:null,
        DeletedAt:null,    
        },
      {
        new: true,
      },
    );
  }
}
