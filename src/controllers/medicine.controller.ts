import { Request, Response } from 'express';
import { MedicineService } from '../services/medicine.service';
import { APIResponse } from '../dtos/common/response.dto';
import { asyncHandler } from '../utils/asyncHandler';

const service = new MedicineService();
export class MedicineController {
  createMedicine = asyncHandler(async (req: Request, res: Response) => {
    const createMedicine = await service.createMedicine(req.body);
    const result: APIResponse<typeof createMedicine> = {
      success: true,
      message: 'create data successfully',
      data: createMedicine,
    };
    res.status(201).json(result);
  });
  getAllMedicine = asyncHandler(async (req: Request, res: Response) => {
    const getData = await service.getAllMedicine(req.query);
    const result: APIResponse<typeof getData> = {
      success: true,
      message: 'Data fetch successfully',
      data: getData,
    };
    res.status(200).json(result);
  });

  getSingleMedicine = asyncHandler(async (req: Request, res: Response) => {
    const SingleData = await service.getMedicine(req.params.id);
    const result: APIResponse<typeof SingleData> = {
      success: true,
      message: 'medicine get successfully',
      data: SingleData,
    };
    res.status(200).json(result);
  });
  updateMedicine = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const updateData = await service.updateMedicine(id, data);
    const result: APIResponse<typeof updateData> = {
      success: true,
      message: 'update data successfully',
      data: updateData,
    };
    res.status(200).json(result);
  });
  searchQuery = asyncHandler(async (req: Request, res: Response) => {
    const searchData = await service.searchData(req.query);
    const result: APIResponse<typeof searchData> = {
      success: true,
      message: 'searching Data successfully',
      data: searchData,
    };
    res.status(200).json(result);
  });
  isSoftDelete = asyncHandler(async (req: Request, res: Response) => {
    const softDeleteData = await service.softDelete(req.params.id);
    const result: APIResponse<typeof softDeleteData> = {
      success: true,
      message: 'soft Deleted successfully',
      data: null,
    };
    res.status(200).json(result);
  });
  medicineRestore = asyncHandler(async (req: Request, res: Response) => {
    const restoreData = await service.restoreData(req.params.id);
    const result: APIResponse<typeof restoreData> = {
      success: true,
      message: 'restored medicine successfully',
      data: restoreData,
    };
    res.status(200).json(result);
  });
  medicineAddStock = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const {quantity} = req.body;
    const AddStckData = await service.AddStock(id, quantity);
    const result: APIResponse<typeof AddStckData> = {
      success: true,
      message: 'Add Stock Successfully',
      data: AddStckData,
    };
    res.status(200).json(result);
  });
  medicineReducer = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const {quantity} = req.body;
    const reduceStock = await service.reduceStock(id, quantity);
    const result: APIResponse<typeof reduceStock> = {
      success: true,
      message: 'reduce stock successfully',
      data: reduceStock,
    };
    res.status(200).json(result);
  });
  lowStock = asyncHandler(async(req: Request, res: Response)=>{
    const threshold = Number(req.query.threshold) || 10;
    const lowStockData = await service.lowStock(threshold);
    const result :APIResponse<typeof lowStockData>={
      success: true,
      message: "Low Stock data", 
      data:lowStockData

    }
    res.status(200).json(result);
  });
  expirySoon = asyncHandler(async(req:Request, res: Response)=>{
    const days = Number(req.query.days)||30;
    const expiryDate = await service.expirySoon(days);
    const result :APIResponse<typeof expiryDate>={
         success:true,
         message:"Expiry soon",
         data: expiryDate
    }
    res.status(200).json(result);
  })
  expired = asyncHandler(async(req: Request, res: Response)=>{
    const expired = await service.expired();
    const result  :APIResponse<typeof expired>={
       success: true,
       message:"Expired data successfully",
       data: expired
     }
     
  res.status(200).json(result);
  })
}
