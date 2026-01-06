import { NotificationDocument } from '../models/notification.model';
import { publishNotification } from '../producers/notification.producer';
import { NotificationRepo } from '../repositories/notification.repo';

export class NotificationService {
  constructor(private Repository = new NotificationRepo()) {}
  async sendNotification(data: Partial<NotificationDocument>) {
    const notification = await this.Repository.createNotification(data);
    console.log(notification);
    // PUCH TO QUEUE
    await publishNotification({
      notificationId: notification._id,
      type: data.type,
      channel: data.channel,
      message: data.message,
    });
   return notification;
  }
  async getNotification() {
    return this.Repository.getNotifyData();
  }
  async singleNotification(id: string) {
    return this.Repository.findByUser(id);
  }
  async markData(id: string) {
    return this.Repository.markDataById(id);
  }
}
