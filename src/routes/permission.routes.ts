import { PermissionController } from '../controllers/permission.controller';
import { Router } from 'express';
import { validate } from '../middleware/validate';
import { verifyToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/authorizedRole';
import { createPermissionSchema } from '../validations/rbac.validation';
const router = Router();

const controllers = new PermissionController();
router.post(
  '/',
  verifyToken,
  authorizeRole('superadmin'),
  validate(createPermissionSchema),
  controllers.permissionAdd,
);
router.get('/', verifyToken, authorizeRole('admin'), controllers.getPermission);
router.put(
  '/:id',
  verifyToken,
  authorizeRole('admin'),
  controllers.updataPermission,
);
router.delete(
  '/:id/delete',
  verifyToken,
  authorizeRole('admin'),
  controllers.softDelete,
);
router.put(
  '/:id/restore',
  verifyToken,
  authorizeRole('admin'),
  controllers.restoreDelete,
);

export default router;

// post /permission  = create permission
// get /permission = List all +pagination +search
// get /permission/:id = get single permission
// put /permission/:id = update
// delete /permissions/:id = soft delete
// patch /permission/:id/restore =Restore delete permission
// get /permission/export  = export permission to csv
// post /permission/import = upload csv & import
