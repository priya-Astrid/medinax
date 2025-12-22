import { permission } from '../models/permissions';
import { PermissionRepository  } from '../repositories/permission.repo';
import { AppError } from '../utils/AppError';

export class PermissionService {
  private repo = new PermissionRepository();
   async permissionCreate(data: any) {
      const exists = await permission.findOne({ permissionName: data.permissionName });
  if (exists) throw new AppError(400, "Permission already exists");

      return this.repo.permissionCreate(data);
  }
  
  async getPermission(){
    return this.repo.getPermission();
  };
  async updataPermission(id: string, data:any){
    return this.repo.updateData(id, data);
  }
  async softDelete(id:string){
  
    return this.repo.deleteData(id);
  }

  async restorePermission(id: string){
    return this.repo.restoreData(id);
  }
}


// async pharmacyData(data: Partial<pharmacyDocument>) {

//   if (!data.patientId)
//     throw new AppError(400, "Patient is required");

//   if (!data.items || data.items.length === 0)
//     throw new AppError(400, "At least one medicine required");

//   let totalAmount = 0;

//   for (const item of data.items) {
//     if (item.quantity <= 0)
//       throw new AppError(400, "Invalid quantity");

//     // yaha medicine service/repo call hota hai
//     const medicine = await this.Repo.findMedicine(item.medicineId);

//     if (!medicine)
//       throw new AppError(404, "Medicine not found");

//     if (medicine.stock < item.quantity)
//       throw new AppError(400, "Insufficient stock");

//     totalAmount += medicine.mrp * item.quantity;
//   }

//   data.totalAmount = totalAmount;
//   data.status = "pending";

//   return this.Repo.createPharmacyData(data);
// }
