import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { NotificationService } from '../services/notification.service';
import { APIResponse } from '../dtos/common/response.dto';

const service = new NotificationService();
export class NotificationController {
  createNotification = asyncHandler(async (req: Request, res: Response) => {
    const notification = await service.sendNotification(req.body);
    const result: APIResponse<typeof notification> = {
      success: true,
      message: 'Notification saved successfully',
      data: notification,
    };
    res.status(201).json(result);
  });
  getUserNotification = asyncHandler(async (req: Request, res: Response) => {
    const fetchedData = await service.getNotification();
    const result: APIResponse<typeof fetchedData> = {
      success: true,
      message: 'Notification fetched successfully',
      data: fetchedData,
    };
    res.status(200).json(result);
  });
  getMyNotification = asyncHandler(async(req: Request, res: Response)=>{
    const singleNotifyData = await service.singleNotification(req.params.id);
    const result : APIResponse<typeof singleNotifyData>={
      success: true,
      message: "Single Data fetched Successfully",
      data: singleNotifyData
    }
    res.status(200).json(result);
  })
  markAsRead = asyncHandler(async(req: Request, res: Response)=>{
    const markReadData = await service.markData(req.params.id);
    const result : APIResponse<typeof markReadData>={
      success: true,
      message: "Read message successfully",
      data:markReadData
    }
    res.status(200).json(result);
  })
}
