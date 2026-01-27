import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/database';
import { connectRabbitMQ } from './config/rabbitmq';
const PORT = process.env.PORT;
(async () => {
  try {
    await connectDB();
    console.log('database connected..');
    await connectRabbitMQ();
    console.log('Rabbitmq connected..');
    
    app.listen(PORT, () => {
      console.log(`All Service running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`server Service startuo failed`, error);
    process.exit(1);
  }
})();
// connectDB().then(()=>{
//     app.listen(PORT, ()=>{
//         console.log(`All Service running on port ${PORT}`);
//     })
// })
