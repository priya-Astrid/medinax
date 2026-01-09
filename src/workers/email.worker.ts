import mongoose from 'mongoose';
import { getChannel } from '../config/rabbitmq';
import { sendMailMessage } from '../helpers/email.service';
import { notificaion } from '../models/notification.model';
const NOTIFICATION_EXCHANGE = process.env.NOTIFICATION_EXCHANGE!;

export const startEmailWorker = async () => {
  const channel = getChannel();
  const EMAIL_QUEUE = 'email_queue';
  await channel.assertQueue(EMAIL_QUEUE, { durable: true });
  channel.bindQueue(EMAIL_QUEUE, NOTIFICATION_EXCHANGE, 'notification.email');
  channel.consume(EMAIL_QUEUE, async (msg) => {
    if (!msg) return;
    try {
      const payload = await JSON.parse(msg.content.toString());
      console.log('this is payload email consumer', payload);
      // const data = await sendMailMessage({
      //   to: payload.channel,
      //   subject: payload.type,
      //   message: payload.message,
      // });

      await notificaion.findByIdAndUpdate(
        new mongoose.Types.ObjectId(payload.notificationId),
        { $set: { status: 'SENT' } },
      );

      channel.ack(msg);
    } catch (error) {
      console.log('notification failed', error);

      channel.nack(msg, false, true);
    }
  });
};
