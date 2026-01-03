import { labCategoryDocument } from '../models/labCategory.model';
import { LabCategoryRepository } from '../repositories/labCategory.repo';
import { AppError } from '../utils/AppError';

export class LabCategoryService {
  constructor(private repository = new LabCategoryRepository()){}
  async createData(data: Partial<labCategoryDocument>) {
    if(!data.name) throw new AppError(400, "category name is required")
    const exist = await this.repository.findByName(data.name);
    if(exist){
     throw new AppError(400, "category name already exists");
    }
    
    return this.repository.createLabcategory(data);
  }
  async getAllData(query: any) {
    return this.repository.getAllData(query);
  }

  async singleData(id: string){
    return this.repository.findById(id)
  }
  async dropdownData(){
    return this.repository.dropdownData();
  }
  async updateData(id: string, data: Partial<labCategoryDocument>) {
    if(data.name){
      const exist = await this.repository.findByName(data.name);
      if(exist && exist.id.toString() !== id){
        throw new AppError(400, "category already exists")
      }
    }
    const updateData = await this.repository.UpdateData(id, data);
    if(!updateData) throw new AppError(404, "category not found");
    return updateData;
  }
  async softDelete(id: string,userId: string) {
    return this.repository.SoftDeleteData(id, userId);
  }
}
