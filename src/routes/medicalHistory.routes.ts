import { Router } from 'express';
import { MedicalHistoryController } from '../controllers/medicalHistory.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate';
import {
  medicaHistorySchema,
  updateMedicalHistory,
} from '../validations/medicalHistory.validation';
import { authorizeRole } from '../middleware/authorizedRole';

const router = Router();
const controller = new MedicalHistoryController();

router.post(
  '/',
  verifyToken,
  authorizeRole('superadmin', 'admin'),
  validate(medicaHistorySchema),
  controller.createMedicalHistory,
);

router.get(
  '/search',
  verifyToken,
  authorizeRole('superadmin', 'admin', 'doctor'),
  controller.getSearchFilter,
); //search advance filter
router.get(
  '/',
  verifyToken,
  authorizeRole('superadmin', 'admin'),
  controller.getAllRecords,
); //all medical history
router.get(
  '/:id',
  verifyToken,
  authorizeRole('superadmin', 'admin'),
  controller.getSingleRecord,
); //singlerecord
router.put(
  '/:id/update',
  verifyToken,
  authorizeRole('superadmin', 'admin'),
  validate(updateMedicalHistory),
  controller.updateRecords,
);
router.patch(
  '/:id/soft-delete',
  verifyToken,
  authorizeRole('admin'),
  controller.softDelete,
);
router.patch('/:id/restore',
  verifyToken,
  authorizeRole('admin'),
  controller.restoreData
);

export default router;
