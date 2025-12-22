import { Router } from 'express';
import { labOrderController } from '../controllers/labOrder.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/authorizedRole';
import { validate } from '../middleware/validate';
import { createLabOrder } from '../validations/labOrder.validation';

const routes = Router();
const controller = new labOrderController();
routes.post(
  '/',
  verifyToken,
  authorizeRole('admin', 'doctor'),
  validate(createLabOrder),
  controller.createLabOrder,
);
routes.get('/', verifyToken, authorizeRole('admin'), controller.getAllLabOrder);
routes.get('/:id', verifyToken, controller.getSingleData);
routes.put(
  '/:id',
  verifyToken,
  authorizeRole('admin'),
  controller.updateLabOrder,
);
routes.patch(
  '/:id/collect-sample',
  verifyToken,
  authorizeRole('admin'),
  controller.collectSample,
);
routes.patch(
  '/:id/status',
  verifyToken,
  authorizeRole('admin'),
  controller.statusUpdate,
);
routes.delete(
  '/:id',
  verifyToken,
  authorizeRole('admin'),
  controller.cancelLabOrder,
);

export default routes;

// NDUSTRY-LEVEL MISSING APIs (ADD THESE)
// 🔹 1) Get LabOrder by ID

// GET /lab-order/:id =done

// 🔹 2) Update Test Status

// PATCH /lab-order/:id/test/:testId = done

// 🔹 3) Sample Collection API

// POST /lab-order/:id/collect-sample =done

// 🔹 4) Start Processing

// PATCH /lab-order/:id/start-processing

// 🔹 5) Complete a Test

// PATCH /lab-order/:id/test/:testId/complete

// 🔹 6) Complete Entire Order

// PATCH /lab-order/:id/complete

// 🔹 7) Generate Report Upload API

// POST /lab-order/:id/upload-report
