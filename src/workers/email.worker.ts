import { getChannel } from '../config/rabbitmq';;
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
      console.log('this is payload consumer', payload);

      channel.ack(msg);
    } catch (error) {
      console.log('notification failed', error);
      channel.nack(msg, false, true);
    }
  });
};
