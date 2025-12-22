import dotenv from 'dotenv';
dotenv.config();
 
import app from './app';
import {connectDB} from './config/database';
const PORT = process.env.PORT ;

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`All Service running on port ${PORT}`);
    })
})