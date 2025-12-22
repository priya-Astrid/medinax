import { Request, Response } from 'express';
import { APIResponse } from '../dtos/common/response.dto';
import { RoleService } from '../services/role.service';
import { asyncHandler } from '../utils/asyncHandler';

const service = new RoleService();

export class RoleController {
  createRole = asyncHandler(async (req: Request, res: Response) => {
    const addrole = await service.createRole(req.body);
    const result: APIResponse<typeof addrole> = {
      success: true,
      message: 'add role Successfully',
      data: addrole,
    };
    res.status(200).json(result);
  });
  getAllRole = asyncHandler(async (req: Request, res: Response) => {
    const getrole = await service.getAllRole();
    const result: APIResponse<typeof getrole> = {
      success: true,
      message: 'fetch data Successfully',
      data: getrole,
    };
    res.status(200).json(result);
  });
  assignPermissions = asyncHandler(async(req: Request, res: Response)=>{
    const roleId = req.params.roleId;
    const {permissions} = req.body ;
    const assignPermissionsData = await service.assignPermissionToRole(roleId, permissions);
    const result :APIResponse<typeof assignPermissionsData>={
     success: true,
     message: "assign permissison successfully",
     data: assignPermissionsData
    }
    res.status(200).json(result);
  }) 
  updateRole = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const updateRole = await service.updateRole(id, data);
    const result: APIResponse<typeof updateRole> = {
      success: true,
      message: 'Update Role Successfully',
      data:updateRole,
    };
    res.status(200).json(result);
  });
  softDelete = asyncHandler(async (req: Request, res: Response) => {
    const softDeleteData = await service.softDelete(req.params.id);
    const result: APIResponse<typeof softDeleteData> = {
      success: true,
      message: 'Role deleted Successfully',
    };
    res.status(200).json(result);
  });
}
