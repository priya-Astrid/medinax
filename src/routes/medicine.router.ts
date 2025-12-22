import { Router } from 'express';
import { MedicineController } from '../controllers/medicine.controller';
import { validate } from '../middleware/validate';
import { createMedicineSchema } from '../validations/medicine.validation';
import { verifyToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/authorizedRole';

const router = Router();
const controller = new MedicineController();
router.post(
  '/',
  verifyToken,
  authorizeRole('admin', 'pharmacist'),
  validate(createMedicineSchema),
  controller.createMedicine,
);
router.get(
  '/',
  verifyToken,
  authorizeRole('admin', 'pharmacist', 'doctor'),
  controller.getAllMedicine,
);

router.get(
  '/search',
  verifyToken,
  authorizeRole('admin', 'pharmacist', 'doctor'),
  controller.searchQuery,
);
router.get(
  '/low-stock',
  verifyToken,
  authorizeRole('admin', 'pharmacist'),
  controller.lowStock,
);
router.get(
  '/expiry-soon',
  verifyToken,
  authorizeRole('admin', 'pharmacist'),
  controller.expirySoon,
);
router.get('/expired', verifyToken, authorizeRole('admin'), controller.expired);

router.get(
  '/:id',
  verifyToken,
  authorizeRole('admin', 'pharmacist', 'doctor'),
  controller.getSingleMedicine,
);
router.put(
  '/:id',
  verifyToken,
  authorizeRole('admin', 'pharmacist'),
  controller.updateMedicine,
);

router.patch(
  '/:id/add-stock',
  verifyToken,
  authorizeRole('admin', 'pharmacist'),
  controller.medicineAddStock,
);
router.patch(
  '/:id/reduce-stock',
  verifyToken,
  authorizeRole('admin', 'pharmacist'),
  controller.medicineReducer,
);
router.delete(
  '/:id/soft-delete',
  verifyToken,
  authorizeRole('admin'),
  controller.isSoftDelete,
);
router.patch(
  '/:id/restore',
  verifyToken,
  authorizeRole('admin'),
  controller.medicineRestore,
);
export default router;
