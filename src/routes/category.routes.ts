import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/authorizedRole';
import { validate } from '../middleware/validate';
import {
  createCategorySchema,
  updateCategorySchema,
} from '../validations/medicineCategory.validation';

const routes = Router();
const controller = new CategoryController();
routes.post(
  '/',
  verifyToken,
  authorizeRole('admin'),
  validate(createCategorySchema),
  controller.categoryCreate,
);
routes.get('/', verifyToken, authorizeRole('admin'), controller.getAllCategory);
routes.put(
  '/:id',
  verifyToken,
  authorizeRole('admin'),
  validate(updateCategorySchema),
  controller.updateData,
);
routes.delete(
  '/:id',
  verifyToken,
  authorizeRole('admin'),
  controller.softDelete,
);

export default routes;
