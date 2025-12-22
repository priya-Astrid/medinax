import { Role, RoleDocument } from '../models/role.model';

export class RoleRepository {
  async findRole(role: string) {
    return await Role.findOne({ role });
  }
  async createRole(data: Partial<RoleDocument>): Promise<RoleDocument> {
    return await Role.create(data);
  }
  async assignPermission(roleId: string, permissionId: string[]) {
    return await Role.findByIdAndUpdate(
      roleId,
      {
        $addToSet: { permissions: { $each: permissionId } },
      },
      { new: true },
    ).populate('permissions');
  }

  async getAllrole(): Promise<RoleDocument[]> {
    return await Role.find({ isDeleted: false });
  }
  async updateRole(id: any, data: any) {
    return await Role.findByIdAndUpdate(id, data, { new: true });
  }
  async softDelete(id: string) {
    return await Role.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }
}
