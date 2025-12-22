import { permission, permissionDocument } from "../models/permissions";

export class PermissionRepository {
  
    async permissionCreate(data: any){
      return await permission.create(data);
    }
    async findByPermissionName(permissionName: string[]):Promise<permissionDocument[]>{
        return await permission.find({
            permissionName: {$in : permissionName},
        })
    }
    async getPermission(){
        return await permission.find({isDeleted:false});
    }
    async updateData(id: string, data: any ){
        return await permission.findByIdAndUpdate(id, data, {new: true})
    }
    async deleteData(id:string){
        return await permission.findByIdAndUpdate(id,{isDeleted: true} ,{new: true});
    }
    async restoreData(id: string){
        return await permission.findByIdAndUpdate(id,{isDeleted: false},{new: true});
    }
} 