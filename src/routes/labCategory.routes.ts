import { Router } from 'express';
import { LabCategoryController  } from '../controllers/LabCategory.controller';
import { validate } from '../middleware/validate';
import {
  createLabCategory,
  updateLabCategory,
} from '../validations/labCategory.validation';
import { verifyToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/authorizedRole';

const routes = Router();
const controller = new LabCategoryController ();

routes.post(
  '/',
  verifyToken,
  authorizeRole('admin'),
  validate(createLabCategory),
  controller.createData,
);
routes.get('/', verifyToken, controller.getAllData);
routes.get('/dropdown', verifyToken, controller.getDropdown);
routes.put(
  '/:id',
  verifyToken,
  authorizeRole('admin'),
  controller.UpdateLabTest,
);
routes.patch(
  '/:id/soft-delete',
  verifyToken,
  authorizeRole('admin'),
  validate(updateLabCategory),
  controller.softDeleteLab,
);
export default routes;

