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
router.get('/search', verifyToken, controller.searchDoctors);

router.get(
  '/specialization',
  verifyToken,
  authorizeRole('admin', 'doctor'),
  controller.getSpecializations,
);
// router.get('/paginated', controller.getAllDcotorPagination);
router.get('/me', verifyToken, controller.getDoctorProfile);
router.patch(
  '/me/profile',
  verifyToken,
  authorizeRole('doctor'),
  validate(DoctorValidationSchema),
  controller.updateDoctorProfile,
);

router.patch(
  '/:id/avatar',
  verifyToken,
  authorizeRole('doctor'),
  uploadFile('doctors').single('image'),
  controller.uploadProfileImage,
);
router.get('/:id', verifyToken, controller.getDoctorById);
router.put(
  '/:id/profile',
  verifyToken,
  authorizeRole('doctor', 'admin'),
  validate(DoctorValidationSchema),
  controller.updateDoctorByAdmin,
);

router.patch(
  '/:id/status',
  verifyToken,
  authorizeRole('admin', 'superadmin'),
  controller.toggleStatus,
);
router.patch(
  '/:id/soft-delete',
  verifyToken,
  authorizeRole('admin', 'superadmin'),
  controller.softDeleteDoctor,
);
router.patch(
  '/:id/restore',
  verifyToken,
  authorizeRole('admin','doctor'),
  controller.restoreDoctor
)
router.post(
  '/:id/schedule',
  verifyToken,
  authorizeRole('doctor'),
  controller.addSchedule,
);

export default router;

// GET /api/doctor/getDoctor?page=2&limit=5&sortBy=experience&sortOrder=asc
//get All doctor  => http://localhost:4001/api/doctor/
// getdataById =>http://localhost:6000/api/doctor/:id
// http://localhost:6000/api/doctor/search?specialization=cardiology&availableDays=MONDAY
// http://localhost:6000/api/doctor/update/68dcf5cb24ae6ec978043d6d

// GET /api/doctor/getDoctor?page=2&limit=5&sortBy=experience&sortOrder=asc
