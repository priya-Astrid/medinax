import {
  notificaion,
  NotificationDocument,
} from '../models/notification.model';

export class NotificationRepo {
  async createNotification(data: Partial<NotificationDocument>) {
    return notificaion.create(data);
  }
  async getNotifyData() {
    return notificaion.find();
  }
  async findByUser(id: string) {
    return notificaion.find({_id:id}).sort({createdAt: -1});
  }
  async markDataById(id: string){
    return notificaion.findByIdAndUpdate(id,{isRead: true}, {new: true})
  }
}
