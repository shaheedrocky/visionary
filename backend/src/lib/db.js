import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connectMongoDB =  async() => {
    try {
        const conn = await mongoose.connect(ENV.MONGODB_URI);
        console.log('Mongo DB connected successfully: ',conn.connection.host);
    } catch (error) {
        console.log('Error connecting to Mongo DB: ', error);
        process.exit(1) //1 means 'Fail' 0 means 'Success'
    }
}