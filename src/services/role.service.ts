import { Role, RoleDocument } from '../models/role.model';
import { PermissionRepository } from '../repositories/permission.repo';
import { RoleRepository } from '../repositories/role.repo';
import { AppError } from '../utils/AppError';

export class RoleService {
  private repo: RoleRepository;
  private permissionRepo = new PermissionRepository();
  constructor() {
    this.repo = new RoleRepository();
  }
  async createRole(data: Partial<RoleDocument>){
    if(!data.role) throw new AppError(400, 'role is required');
    const exists = await this.repo.findRole(data.role)
    if(exists) throw new AppError(400, "Role already exists")
    return await this.repo.createRole(data);
  }
  async getAllRole(){
    return this.repo.getAllrole();
  }
  async assignPermissionToRole(roleId: string, permissionName: string[]){
    if(!permissionName?.length){
      throw new AppError(400, "permission are required");
    }

    const permissions = await this.permissionRepo.findByPermissionName(permissionName)
    if(permissions.length !== permissionName.length){
      throw new AppError(400, "one or more permission invalid")
    }
    
  const permissionIds:string[] = permissions.map(p => p._id.toString());

    const role = await this.repo.assignPermission(roleId, permissionIds);
    if(!role) throw new AppError(400, "Role not found");
    return role;
  }
  async updateRole(id:string, data: Partial<RoleDocument>){
    return this.repo.updateRole(id, data);
  }
  async softDelete(id: string){
    return this.repo.softDelete(id);
  }
}
