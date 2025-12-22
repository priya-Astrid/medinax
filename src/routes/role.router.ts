import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/authorizedRole';
import { validate } from '../middleware/validate';
import {
  assignPermissionSchema,
  createRoleSchema,
} from '../validations/rbac.validation';

const router = Router();
const controller = new RoleController();
router.post(
  '/',
  verifyToken,
  authorizeRole('superadmin'),
  validate(createRoleSchema),
  controller.createRole,
);
router.post(
  '/:roleId/permission',
  verifyToken,
  authorizeRole('admin'),
  validate(assignPermissionSchema),
  controller.assignPermissions,
);
router.get('/', verifyToken, controller.getAllRole);
router.put('/:id', verifyToken, authorizeRole('admin'), controller.updateRole);

router.delete(
  '/:id',
  verifyToken,
  authorizeRole('admin'),
  controller.softDelete,
);
export default router;
