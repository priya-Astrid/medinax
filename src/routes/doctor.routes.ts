import { Router } from 'express';
import { DoctorController } from '../controllers/doctor.controller';
import { validate } from '../middleware/validate';
import { DoctorValidationSchema } from '../validations/doctor.validation';
import { verifyToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/authorizedRole';
import { uploadFile } from '../middleware/multer';
const router = Router();
const controller = new DoctorController();

router.get('/', verifyToken, controller.getAllDoctors);
router.get(
  '/specialization',
  verifyToken,
  authorizeRole('admin', 'doctor'),
  controller.getSpecializations,
);
// router.get('/paginated', controller.getAllDcotorPagination);
router.get('/doctorProfile', verifyToken, controller.getDoctorProfile);
router.get('/search', verifyToken, controller.searchDoctors);
router.get('/:doctorId', verifyToken, controller.getDoctorAdminById);
router.put(
  '/:doctorId/data',
  verifyToken,
  authorizeRole('doctor', 'admin'),
  validate(DoctorValidationSchema),
  controller.updateDoctorByAdmin,
);
router.patch(
  '/:doctorId/image',
  verifyToken,
  // authorizeRole('doctor'),
  uploadFile('doctors').single('image'),
  controller.imageUploadDoctorProfile,
);

router.post(
  '/:doctorId/schedule',
  verifyToken,
  authorizeRole('doctor'),
  controller.addSchedule,
);
router.patch(
  '/:doctorId/status',
  verifyToken,
  authorizeRole('admin', 'superadmin'),
  controller.toggleStatus,
);

router.patch(
  '/:doctorId',
  verifyToken,
  authorizeRole('admin', 'superadmin'),
  controller.deleteDoctor,
);

export default router;

// GET /api/doctor/getDoctor?page=2&limit=5&sortBy=experience&sortOrder=asc
//get All doctor  => http://localhost:4001/api/doctor/
// getdataById =>http://localhost:6000/api/doctor/:id
// http://localhost:6000/api/doctor/search?specialization=cardiology&availableDays=MONDAY
// http://localhost:6000/api/doctor/update/68dcf5cb24ae6ec978043d6d

// GET /api/doctor/getDoctor?page=2&limit=5&sortBy=experience&sortOrder=asc
