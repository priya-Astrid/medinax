import { Router } from 'express';
import { DoctorController } from '../controllers/doctor.controller';
import { validate } from '../middleware/validate';
import { DoctorValidationSchema } from '../validations/doctor.validation';
import { verifyToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/authorizedRole';
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
router.post('/search', verifyToken, controller.searchDoctors);
router.get('/:doctorId', verifyToken, controller.getDoctorById);
router.put(
  '/:doctorId/data',
  verifyToken,
  authorizeRole('doctor', 'admin'),
  validate(DoctorValidationSchema),
  controller.updateDoctor,
);

router.post(
  '/:doctorId/schedule',
  verifyToken,
  authorizeRole('doctor'),
  controller.addSchedule,
);
router.post(
  '/:doctorId/status',
  verifyToken,
  authorizeRole('admin', 'superadmin'),
  controller.toggleStatus,
);

router.delete(
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
