import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedUser extends JwtPayload {
  id: string;
  email?: string;
  role: string | string[];
  permissions?: string[];
}
export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
  // user?: JwtPayload | (string & { role?: string });
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ success: false, message: 'Access Token Missing' });
  }
  const token = authHeader?.split(' ')[1];
  try {
    const ACCESS_SECRET = process.env.ACCESS_SECRET!;
    const decoded = jwt.verify(token, ACCESS_SECRET) as AuthenticatedUser;
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: 'Invalid or expired token' });
  }
};
