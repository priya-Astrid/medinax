import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorHandler';
import UserRouter from './routes/auth.routes';
import prescription from './routes/prescription.routes';
import medicalHistory from './routes/medicalHistory.routes';
import UserRole from './routes/role.router';
import medicineCategory from './routes/category.routes';
import LabTest from './routes/labTest.routes';
import LabOrder from './routes/labOrder.routes';
import LabCategory from './routes/labCategory.routes'
import hospitalRoutes from './routes/hospital.routes';
import medicineRouter from './routes/medicine.router';
import consultation from './routes/consultation.routes';
import permission from './routes/permission.routes';
import invoice from './routes/invoice.routes';
import pharmacyRouter from './routes/pharmacyOrder.routes';
import doctorRoutes from './routes/doctor.routes';
import PatientRouter from './routes/patient.routes';
import appointmentRouter from './routes/appointment.routes';
import notificationRoutes from './routes/notification.routes';
dotenv.config();
const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(bodyParser.json());
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'to many request from this api, please try again ',
});
app.use(limiter);
app.use(cookieParser());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api/permission', permission);
app.use('/api/prescription', prescription);
app.use('/api/pharmacy', pharmacyRouter);
app.use('/api/consultation', consultation);
app.use('/api/notification', notificationRoutes);
app.use('/api/medicineCategory', medicineCategory);
app.use('/api/medicine', medicineRouter);
app.use('/api/auth', UserRouter);
app.use('/api/role', UserRole);
app.use('/api/invoice',invoice)
app.use('/api/labcategory', LabCategory);
app.use('/api/labtest', LabTest);
app.use('/api/labOrder', LabOrder);
app.use('/api/patients', PatientRouter);
app.use('/api/doctor', doctorRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/appointment', appointmentRouter);
app.use('/api/medicalHistory', medicalHistory);
app.use(errorHandler);
export default app;
