import mongoose from 'mongoose';

export const connectMongoDB =  async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongo DB connected successfully: ',conn.connection.host);
    } catch (error) {
        console.log('Error connecting to Mongo DB: ', error);
        process.exit(1) //1 means 'Fail' 0 means 'Success'
    }
}