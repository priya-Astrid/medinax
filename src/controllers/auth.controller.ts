import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/auth.service';
import { APIResponse } from '../dtos/common/response.dto';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

const service = new UserService();
export class UserController {
  createUser = asyncHandler(async (req: Request, res: Response) => {
    const User = await service.createUser(req.body);
    const response: APIResponse<typeof User> = {
      success: true,
      message: 'user created successfully',
      data: User,
    };
   return res.status(201).json(response);
  });
  login = asyncHandler(async (req: Request, res: Response) => {
    const { user, accessToken, refreshToken } = await service.loginUser(
      req.body,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const response: APIResponse<typeof user> = {
      success: true,
      message: 'login successfully',
      data: { user, accessToken },
    };
  return  res.status(200).json(response);
  });

  forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const user = await service.generateOtp(req.body);
    const response: APIResponse<typeof user> = {
      success: true,
      message: 'send the otp in your email',
      data: user,
    };
    res.status(200).json(response);
  });
  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const user = await service.resetUserPassword(req.body);
    const response: APIResponse<typeof user> = {
      success: true,
      message: 'password Reset successfully',
      data: user,
    };
    res.status(200).json(response);
  });
  getOneUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await service.getOneUser(req.params.id);

    const response: APIResponse<typeof user> = {
      success: true,
      message: 'data fetched successfully',
      data: user,
    };
    res.status(200).json(response);
  });
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const user = await service.getAllUser(req.query);
    const response: APIResponse<typeof user> = {
      success: true,
      message: 'Get All data',
      data: user,
    };
    res.status(200).json(response);
  });
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: 'refresh token not found' });
    }
    const tokenData = await service.refreshToken(refreshToken);
    const response: APIResponse<typeof tokenData> = {
      success: true,
      message: ' token refreshed',
      data: tokenData,
    };
    res.status(200).json(response);
  });
  logout = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    console.log('refresh user logout', refreshToken);
    if (!refreshToken) {
      return res.status(200).json('Aleady logged out');
    }
    const user = await service.logoutsession(refreshToken);
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    const response: APIResponse<typeof refreshToken> = {
      success: true,
      message: 'logout successfully',
      data: null,
    };
    res.status(200).json(response);
  });
  sendPhoneOtp = asyncHandler(async (req: Request, res: Response) => {
    const phoneUser = await service.sendOtp(req.body);
    const response: APIResponse<typeof phoneUser> = {
      success: true,
      message: 'Otp sent Successfully',
      data: phoneUser,
    };
    res.status(200).json(response);
  });

  verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const verifyOtpData = await service.verifyotp(req.body);
    const response: APIResponse<typeof verifyOtpData> = {
      success: true,
      message: 'Verify Otp Successfully',
      data: verifyOtpData,
    };
    res.status(200).json(response);
  });
  toogleUserStatus = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const id = req.params.id;
    const userId = req.user!.id;
    const { isActive } = req.body;

    const activateUpdate = await service.activatedata(id, isActive, userId);
    const result: APIResponse<typeof activateUpdate> = {
      success: true,
      message: `Admin ${isActive ? 'activate' : 'deactivate'} successfully`,
    };
    res.status(200).json(result);
  });
  softDelete = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;

    const deletedData = await service.softDeleteUser(req.params.id, userId);
    const result: APIResponse<typeof deletedData> = {
      success: true,
      message: 'Deleted Data Successfully',
    };
    res.status(200).json(result);
  });
}
