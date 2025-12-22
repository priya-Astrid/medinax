import { Router } from 'express';
import { LabTestController } from '../controllers/labTest.controller';
import { validate } from '../middleware/validate';
import {
  idParamValidation,
  labTest,
  updateLabTest,
} from '../validations/labtest.validation';
import { verifyToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/authorizedRole';

const routes = Router();
const controller = new LabTestController();
routes.post(
  '/',
  verifyToken,
  authorizeRole('admin'),
  validate(labTest),
  controller.createLabTest,
);
routes.get('/', verifyToken, controller.getAllLabTest);
routes.get(
  '/:id',
  verifyToken,
  validate(idParamValidation),
  controller.singleLabTestData,
);
routes.put(
  '/:id',
  verifyToken,
  authorizeRole('admin'),
  validate(updateLabTest),
  controller.updateData,
);
routes.delete(
  '/:id',
  verifyToken,
  authorizeRole('admin'),
  validate(idParamValidation),
  controller.softDelete,
);

export default routes;
