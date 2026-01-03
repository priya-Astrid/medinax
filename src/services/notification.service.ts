import { NotificationDocument } from '../models/notification.model';
import { NotificationRepo } from '../repositories/notification.repo';

export class NotificationService {
  constructor(private Repository = new NotificationRepo()) {}
  async sendNotification(data: Partial<NotificationDocument>) {
    return this.Repository.createNotification(data);
  }
  async getNotification() {
    return this.Repository.getNotifyData();
  }
  async singleNotification(id: string) {
    return this.Repository.findByUser(id);
  }
  async markData(id: string){
    return this.Repository.markDataById(id)
  }
} 
