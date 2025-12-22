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
router.get('/:patientId', verifyToken, controller.getPatientProfile);
router.put(
  '/:patientId',
 verifyToken,
   uploadFile("patients").single('image'),
 
  validate(updatePatientSchema),
  controller.updateProfile,
);
router.delete(
  '/:patientId',
  verifyToken,
  authorizeRole('admin', 'superadmin', 'doctor'),
  controller.deletePatient,
);

export default router;

// import { Router } from 'express';
// import { PatientController } from '../controllers/patient.controller';

// const router = Router();
// const controller = new PatientController();

// router.post('/profile', controller.create);
// router.get('/', controller.getAll);
// router.get('/:id', controller.getOne);
// router.put('/:id', controller.update);
// router.delete('/:id', controller.delete);

// export default router;
