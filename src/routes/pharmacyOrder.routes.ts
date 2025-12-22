import { Router } from 'express';
import { pharmacyController } from '../controllers/pharmacyOrder.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/authorizedRole';
import { validate } from '../middleware/validate';
import { pharmacyOrderSchema } from '../validations/pharmacyOrder.validation';
const router = Router();

const controller = new pharmacyController();
router.post(
  '/',
  verifyToken,
  authorizeRole('admin','pharmacist'),
  validate(pharmacyOrderSchema),
  controller.createPharmacy,
);
router.get(
  '/',
  verifyToken,
  authorizeRole('admin', 'pharmacist'),
  controller.getAllData,
);
router.put(
  '/:id',
  verifyToken,
  authorizeRole('admin','pharmacist'),
  controller.updatePharmacyData,
);
router.delete(
  '/:id',
  verifyToken,
  authorizeRole('admin', 'pharmacist'),
  controller.softDeleted,
);
export default router;
