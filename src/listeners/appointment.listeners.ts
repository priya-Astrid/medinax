import { eventBus } from '../events/eventBus';
import { NotificationService } from '../services/notification.service';
const notificaionService = new NotificationService()
eventBus.on('APPOINTMENT_BOOKED', async (event) => {
    
  await notificaionService.sendNotification({
    userId: event.patientId,
    channel: 'EMAIL',
    title: 'APPOINTMENT',
    type: 'Appointment_booked',
    message: `your appointment is confirmed for ${event.startTime} to ${event.endTime}`,
  });
});
