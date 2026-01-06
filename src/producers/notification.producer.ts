import { getChannel } from '../config/rabbitmq';
const NOTIFICATION_EXCHANGE = process.env.NOTIFICATION_EXCHANGE!;
const NOTIFICATION_TYPE = process.env.NOTIFICATION_TYPE!;

export const publishNotification = async (payload: any) => {
  const channel = getChannel();
  await channel.assertExchange(NOTIFICATION_EXCHANGE, NOTIFICATION_TYPE, {
    durable: true,
  });
  const routingKey =
    payload.channel === 'EMAIL' ? 'notificaiton.email' : 'notification.sms';
  channel.publish(
    NOTIFICATION_EXCHANGE,
    routingKey,
    Buffer.from(JSON.stringify(payload)),
    {
      persistent: true,
    },
  );
};
