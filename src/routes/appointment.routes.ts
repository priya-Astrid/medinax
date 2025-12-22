import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate';
import {
  createAppointmentvaidate,
  rescheduleValidate,
  updateStatusValidate,
} from '../validations/appoinment.validation';
import { authorizeRole } from '../middleware/authorizedRole';

const router = Router();

const controller = new AppointmentController();

// create and ilst
router.post(
  '/',
  verifyToken,
  authorizeRole('patient'),
  validate(createAppointmentvaidate),
  controller.createAppointment,
);

router.get(
  '/',
  verifyToken,
  authorizeRole('admin', 'superadmin'),
  controller.getAllAppointment,
);

// filter

router.get(
  '/doctor/:doctorId/date/:date',
  verifyToken,
  authorizeRole('doctor'),
  controller.getByDoctorAndDate,
);
router.get(
  '/doctor/:doctorId',
  verifyToken,
  authorizeRole('doctor'),
  controller.getByDoctor,
);
router.get(
  '/patient/:patientId',
  verifyToken,
  authorizeRole('patient'),
  controller.getByPatient,
);
router.get(
  '/upcoming/:patientId',
  verifyToken,
  authorizeRole('patient', 'doctor'),
  controller.getUpcomingAppointment,
);

// appointment by Single id
router.get('/:id', verifyToken, controller.getOneAppointment);
// update
router.put(
  '/:id/status',
  verifyToken,
  authorizeRole('doctor'),
  validate(updateStatusValidate),
  controller.updateStatus,
);
router.put(
  '/:id/notes',
  verifyToken,
  authorizeRole('doctor'),
  controller.updateNotes,
);
router.put(
  '/:id/cancel',
  verifyToken,
  authorizeRole('patient'),
  controller.cancelAppointment,
);
router.put(
  '/:id/reschedule',

  verifyToken,
  authorizeRole('doctor', 'patient'),
  validate(rescheduleValidate),
  controller.rescheduleAppointment,
);
export default router;
