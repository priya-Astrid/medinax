import { Request, Response } from 'express';
import { PermissionService } from '../services/permission.service';
import { APIResponse } from '../dtos/common/response.dto';
import { asyncHandler } from '../utils/asyncHandler';
const service = new PermissionService();
export class PermissionController {
  permissionAdd = asyncHandler(async (req: Request, res: Response) => {
    const permissionCreate = await service.permissionCreate(req.body);
    const result: APIResponse<typeof permissionCreate> = {
      success: true,
      message: 'permission create successfully',
      data: permissionCreate,
    };
    res.status(200).json(result);
  });
  getPermission = asyncHandler(async (req: Request, res: Response) => {
    const getData = await service.getPermission();
    const result: APIResponse<typeof getData> = {
      success: true,
      message: 'Permission fetched successfully',
      data: getData,
    };
    res.status(200).json(result);
  });
  updataPermission = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const updateData = await service.updataPermission(id, data);
    const result: APIResponse<typeof updateData> = {
      success: true,
      message: 'update permission successfully',
      data: updateData,
    };
    res.status(200).json(result);
  });
  softDelete = asyncHandler(async (req: Request, res: Response) => {
    const deleteData = await service.softDelete(req.params.id);
    const result: APIResponse<typeof deleteData> = {
      success: true,
      message: 'permission delete successfully',
      data: deleteData,
    };
    res.status(200).json(result);
  });
  restoreDelete = asyncHandler(async (req: Request, res: Response) => {
    const restoreData = await service.restorePermission(req.params.id);
    const result: APIResponse<typeof restoreData> = {
      success: true,
      message: 'Restore Deleted Permission',
      data: restoreData,
    };
    res.status(200).json(result);
  });
}
