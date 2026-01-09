import { getChannel } from '../config/rabbitmq';
import { sendMailMessage } from '../helpers/email.service';
import { notificaion } from '../models/notification.model';
const NOTIFICATION_EXCHANGE = process.env.NOTIFICATION_EXCHANGE!;

export const startSmsWorker = async () => {
  const channel = getChannel();
  const SMS_QUEUE = 'sms_queue';
  await channel.assertQueue(SMS_QUEUE, { durable: true });
  channel.bindQueue(SMS_QUEUE, NOTIFICATION_EXCHANGE, 'notification.sms');
  channel.consume(SMS_QUEUE, async (msg) => {
    if (!msg) return;
    try {
      const payload = await JSON.parse(msg.content.toString());
      console.log('this is payload consumer', payload);
      // const data =  await sendMailMessage({
      //   to: payload.channel,
      //   subject: payload.type,
      //   message: payload.message,
      // });
      // console.log("varify the data sms Give email...", data)
      await notificaion.updateOne(
        {
          _id: payload.notificationId,
        },
        { $set: { status: 'SENT' } },
      );
      channel.ack(msg);
    } catch (error) {
      console.log('notification failed', error);
      channel.nack(msg, false, true);
    }
  });
};
