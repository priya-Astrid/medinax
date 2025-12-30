import { Router } from 'express';
import { PatientController } from '../controllers/patient.controller';
import { validate } from '../middleware/validate';
import { updatePatientSchema } from '../validations/patient.validate';
import { uploadFile } from '../middleware/multer';
import { verifyToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/authorizedRole';
const router = Router();
const controller = new PatientController();
router.get(
  '/',
  verifyToken,
  authorizeRole('admin', 'superadmin', 'doctor'),
  controller.getAllPatients,
);
router.get('/me', verifyToken, controller.getPatientProfile);
router.get(
  '/:id',
  verifyToken,
  authorizeRole('superadmin', 'admin', 'doctor'),
  controller.getPatientByAdmin,
);

router.get('/:id', verifyToken, controller.singlePatientData);
router.put(
  '/:id',
  verifyToken,
  validate(updatePatientSchema),
  controller.updateProfile,
);
router.put(
  '/:id/avatar',
  verifyToken,
  uploadFile('patients').single('image'),
  controller.imageUpdateProfile,
); //image update
router.put(
  '/:id',
  verifyToken,
  authorizeRole('admin', 'superadmin'),
  controller.adminUpdateProfile,
); //admin update patient profile
 //patient basic info update
router.patch(
  '/:id/soft-delete',
  verifyToken,
  authorizeRole('admin', 'superadmin', 'doctor'),
  controller.softDeletePatient,
);
router.patch(
  '/:id/restore',
  verifyToken,
  authorizeRole('admin'),
  controller.restorePatient,
);
router.patch(
  '/:id/status',
  verifyToken,
  authorizeRole('admin'),
  controller.toggleStatus,
);
export default router;
