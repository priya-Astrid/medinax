import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { AppError } from '../utils/AppError';

export const authorizeRole = (...allowedRoles: string[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      throw new AppError(401, 'Unauthorized');
    }

    const userRoles = req.user.role; // string[]

    // superadmin can access everything
    if (userRoles.includes('superadmin')) {
      return next();
    }

    const hasAccess = allowedRoles.some(role =>
      userRoles.includes(role),
    );

    if (!hasAccess) {
      throw new AppError(
        403,
        `Access denied: insufficient permissions`,
      );
    }

    next();
  };
};


// import { Response, NextFunction } from 'express';
// import { AuthenticatedRequest } from './auth.middleware';
// import { AppError } from '../utils/AppError';
// import { User } from '../models/auth.model';

// export const authorizeRole = (...allowedRoles: string[]) => {
//   return async (
//     req: AuthenticatedRequest,
//     res: Response,
//     next: NextFunction,
//   ) => {
//     if (!req.user) throw new AppError(401, 'Unauthorized : role not found ');

//        if(req.user.role.includes('superadmin')){ return next()}
//     const userRole = req.user.role;
 
//     if (!allowedRoles.includes(userRole)) {
//       throw new AppError(
//         403,
//         `Access denied: Role '${userRole}' is not allowed `,
//       );
//     }
//     next();
//   };
// };
