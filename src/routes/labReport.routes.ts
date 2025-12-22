import { Router } from 'express';
import { LabReportController } from '../controllers/labReport.controller';
import { uploadFile } from '../middleware/multer';
import { verifyToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/authorizedRole';

const routes = Router();
const controller = new LabReportController();

routes.post(
  '/upload-report',
  verifyToken,
  uploadFile('labReport').single('image'),
  controller.uploadReport,
);
routes.get(
  '/',
  verifyToken,
  authorizeRole('admin', 'doctor'),
  controller.getAllReport,
);
routes.get(
  '/report/:id',
  verifyToken,
  authorizeRole('admin', 'doctor'),
  controller.GetSingleReport,
);

routes.get(
  '/patient/:patientId',
  verifyToken,
  authorizeRole('admin', 'doctor', 'patient'),
  controller.getReportsByPatient,
);
routes.put(
  '/verify/:id',
  verifyToken,
  authorizeRole('admin'),
  controller.verifyReport,
);
routes.put(
  '/re-upload/:id',
  verifyToken,
  authorizeRole('admin'),
  uploadFile('labReport').single('image'),
  controller.reUploadReport,
);
routes.put(
  '/update/:id',
  verifyToken,
  authorizeRole('admin'),
  controller.updateReports,
);
routes.delete('/:id', verifyToken,authorizeRole("admin"), controller.softDeletedData);

export default routes;
