import { Router } from 'express';
import { consultationController } from '../controllers/consultation.controller';
import { validate } from '../middleware/validate';
import { createConsultationSchema } from '../validations/consultation.validation';
import { verifyToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/authorizedRole';

const router = Router();

const controller = new consultationController();
router.post(
  '/',
  verifyToken,
  authorizeRole('doctor'),
  validate(createConsultationSchema),
  controller.createConsultation,
);
router.get('/', verifyToken, controller.getAllConsultation);
router.get('/:id', verifyToken, controller.getSingleConsultation);
router.put(
  '/:id/complete',
  verifyToken,
  authorizeRole('doctor'),
  controller.MarkCompleted,
);
router.put(
  '/:id/update',
  verifyToken,
  authorizeRole('doctor'),
  controller.updateConsultation,
);
router.post(
  '/:id/cancel',
  verifyToken,
  authorizeRole('doctor'),
  controller.cancelConsultation,
);
router.put(
  '/:id/notes',
  verifyToken,
  authorizeRole('DOCTOR'),
  controller.notes,
);
export default router;
