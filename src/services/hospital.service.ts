import { HospitalDocument } from '../models/hospital.model';
import { HospitalRepository } from '../repositories/hospital.repo';

export class HospitalService  {
  private repo: HospitalRepository;

  constructor() {
    this.repo = new HospitalRepository();
  }
  async createHospital(data: Partial<HospitalDocument>) {
    return await this.repo.create(data);
  }
  async getAllData(){
    return await this.repo.findData();
  }
  async gethospitalById(id: string){
    return await this.repo.findById(id);
  }
  async updateData(id: string, data : Partial<HospitalDocument>){
    return await this.repo.updateById(id, data)
  }
  async deleteData(id:string){
    return await this.repo.delete(id);
  }
}