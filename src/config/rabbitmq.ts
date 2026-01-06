import amqp from 'amqplib'; 
import { AppError } from '../utils/AppError';

let channel : amqp.Channel;

export const connectRabbitMQ = async() =>{
    const connection = await amqp.connect(process.env.RABBITMQ_URL!);
    channel = await connection.createChannel();
}

export const getChannel = () =>{
    if(!channel){
        throw new AppError(500, 'RabbitMQ channel not initialized');
    }
    return channel;
}