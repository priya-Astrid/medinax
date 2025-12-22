import { AuthenticatedRequest } from './auth.middleware';
import { AppError } from '../utils/AppError';
import { Response, NextFunction } from 'express';
export const authorizedPermission = (...requiredPermissions: string[]) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const user = req.user;
    if (!user) throw new AppError(401, 'unauthorized User');

    if (user.role.includes('superadmin'))    return next();

    const userPermissions = user.permissions || [];
    const hasPermission = requiredPermissions.some((perm) =>
      userPermissions.includes(perm),
    );

    if (!hasPermission) throw new AppError(403, 'permission denied');

    next();
  };
};
