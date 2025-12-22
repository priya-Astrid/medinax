import { Router } from 'express';
import { HospitalController } from '../controllers/hospital.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/authorizedRole';

const router = Router();
const controller = new HospitalController();

router.post('/', verifyToken, authorizeRole('admin'), controller.create);
router.get(
  '/',
  verifyToken,
  controller.getAllHospitalData,
);
router.get('/:id', verifyToken, controller.getById);
router.put(
  '/:id',
  verifyToken,
  authorizeRole('admin'),
  controller.updateHospitalData,
);
router.delete(
  '/:id',
  verifyToken,
  authorizeRole('admin'),
  controller.softDelete,
);
export default router;

// http://localhost:6000/api/hospital/create
// http://localhost:6000/api/hospital/get
// http://localhost:6000/api/hospital/68b17fdfd098614977e031c8
