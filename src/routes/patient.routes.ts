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
router.get("/profile", verifyToken, controller.getPatientProfile);
router.get('/profile/:patientId', verifyToken, controller.getPatientByAdmin);

router.get('/:patientId', verifyToken, controller.singlePatientData);
router.put(
  '/:patientId/image',
  verifyToken,
  uploadFile('patients').single('image'),
  controller.imageUpdateProfile,
);  //image update
router.put(
  '/:patientId/admin',
  verifyToken,
  authorizeRole('admin', 'superadmin'),
  controller.adminUpdateProfile,
);      //admin update patient profile
router.put(
  '/:patientId',
  verifyToken,
  validate(updatePatientSchema),
  controller.updateProfile,
); //patient basic info update
router.delete(
  '/:patientId',
  verifyToken,
  authorizeRole('admin', 'superadmin', 'doctor'),
  controller.softDeletePatient,
);
router.patch(
  '/restore/:patientId',
  verifyToken,
  authorizeRole('admin'),
  controller.restorePatient,
);
router.patch(
  '/toggle/:id',
  verifyToken,
  authorizeRole('admin'),
  controller.toggleStatus,
);
export default router;
