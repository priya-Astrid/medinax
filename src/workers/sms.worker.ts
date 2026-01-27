import { getChannel } from '../config/rabbitmq';
import { sendMailMessage } from '../helpers/email.service';
import { sendSms } from '../helpers/sms.service';
import { User } from '../models/auth.model';
import { notificaion } from '../models/notification.model';
import { AppError } from '../utils/AppError';
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
      const patient = await User.findById(payload.patientId);
      if(!patient) throw new AppError(404, 'patient not found')
      const doctor= await User.findById(payload.doctorId);
      // const data =  await sendMailMessage({
      //   to: payload.channel,
      //   subject: payload.type,
      //   message: payload.message,
      // });
      // console.log("varify the data sms Give email...", data)
    const data =  await sendSms({
        to: payload.channel,
        message: payload.message,
      })

       console.log('this is sms consumer', data);
     
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
