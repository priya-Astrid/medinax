import { Hospital, HospitalDocument } from '../models/hospital.model';

export class HospitalRepository {
  async create(data: Partial<HospitalDocument>) {
    return await Hospital.create(data);
  }
  async findData(filter:any ={}){
    return await Hospital.find({isActive: true, ...filter}).select('__v');
  }
  async findById(id: string) {
    return await Hospital.findById(id);
  }
  async updateById(
    id: string,
    data:  Partial<HospitalDocument>,
  ) {
    return await Hospital.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id: string){
    return await Hospital.findByIdAndUpdate(id, {isActive:false},{new: true});
  }
}

// import { Hospital, HospitalDocument } from '../models/hospital.model';

// export class HospitalRepository {
//   async create(data: Partial<HospitalDocument>): Promise<HospitalDocument> {
//     return await Hospital.create(data);
//   }
//   async findData(): Promise<HospitalDocument[]> {
//     return await Hospital.find();
//   }
//   async findById(id: string): Promise<HospitalDocument | null> {
//     return await Hospital.findById(id);
//   }
//   async updateById(
//     id: string,
//     data: Partial<HospitalDocument>,
//   ): Promise<HospitalDocument | null> {
//     return await Hospital.findByIdAndUpdate(id, data, { new: true });
//   }
//   async delete(id: string): Promise<HospitalDocument | null> {
//     return await Hospital.findByIdAndDelete(id);
//   }
// }