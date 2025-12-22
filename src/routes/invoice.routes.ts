import { Router } from 'express';
import { InvoiceControler } from '../controllers/invoice.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/authorizedRole';
import { validate } from '../middleware/validate';
import {
  createInvoiceSchema,
  updateInvoiceStatusSchema,
} from '../validations/invoice.validation';

const routes = Router();
const controller = new InvoiceControler();
routes.post(
  '/',
  verifyToken,
  authorizeRole('admin', 'receptionist'),
  validate(createInvoiceSchema),
  controller.createInvoice,
);
routes.get('/', verifyToken, authorizeRole('admin'), controller.getInvoice);
routes.get('/:id', verifyToken, controller.getSingleInvoice);
routes.patch(
  '/:id/status',
  verifyToken,
  authorizeRole('admin'),
  validate(updateInvoiceStatusSchema),
  controller.updateInvoiceStatus,
);

routes.delete(
  '/:id',
  verifyToken,
  authorizeRole('admin'),
  controller.isSoftDeleted,
);
routes.patch(
  '/:id/restore',
  verifyToken,
  authorizeRole('admin'),
  controller.restoreInvoice,
);
export default routes;
