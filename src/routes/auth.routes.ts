import { Router } from 'express';
import { UserController } from '../controllers/auth.controller';
import {
  createUserSchema,
  LoginSchema,
  resetPasswordSchema,
} from '../validations/user.validation';
import { verifyToken } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate';
import { authorizeRole } from '../middleware/authorizedRole';
import { authorizedPermission } from '../middleware/authorizedPermissions';

const router = Router();

const controller = new UserController();

router.post(
  '/users',
  verifyToken,
  authorizeRole('superadmin'),
  authorizedPermission('user:create'),
  validate(createUserSchema),
  controller.createUser,
);

router.get('/users', verifyToken, controller.getAllUsers);

router.post('/login', validate(LoginSchema), controller.login);
router.post('/logout', verifyToken, controller.logout);
router.post('/refresh-token', controller.refreshToken);
router.post('/forgot-password', controller.forgotPassword);
router.post(
  '/reset-password',
  validate(resetPasswordSchema),
  controller.resetPassword,
);
router.post('/send-otp', controller.sendPhoneOtp);
router.post('/verify-otp', controller.verifyOtp);
router.get(
  '/:id',
  verifyToken,
  authorizedPermission('user:read'),
  controller.getOneUser,
);
router.put(
  '/:id',
  verifyToken,
  authorizeRole('superadmin'),
  controller.toogleUserStatus,
);
router.put(
  '/:id/delete',
  verifyToken,
  authorizeRole('superadmin'),
  authorizedPermission('user:delete'),
  controller.softDelete,
);
export default router;
