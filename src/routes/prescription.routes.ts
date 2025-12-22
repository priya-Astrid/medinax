import { Router } from 'express';
import { prescriptionController } from '../controllers/prescription.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/authorizedRole';
import { validate } from '../middleware/validate';
import { prescriptionValidation } from '../validations/prescription.validation';
const router = Router();
const controller = new prescriptionController();

router.post(
  '/',
  verifyToken,
  authorizeRole('doctor'),
  validate(prescriptionValidation),
  controller.prescriptionAdd,
);
router.get(
  '/',
  verifyToken,
  authorizeRole('doctor'),
  controller.getPrescription,
);
router.put(
  '/:id',
  verifyToken,
  authorizeRole('doctor'),
  controller.updatePrescription,
);
router.delete(
  '/:id',
  verifyToken,
  authorizeRole('doctor'),
  controller.deletePrescription,
);
export default router;
