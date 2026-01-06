import { connectDB } from "../config/database";
import { connectRabbitMQ } from "../config/rabbitmq";
import { startEmailWorker } from "./email.worker";
import { startSmsWorker } from "./sms.worker";

(async()=>{
 await connectDB();
 await connectRabbitMQ();
 await startEmailWorker();
 await startSmsWorker();
})();