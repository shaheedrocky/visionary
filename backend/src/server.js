import express from "express"
import dotenv from 'dotenv'
import { connectMongoDB } from "./lib/db.js";
import route from "./routes/routes.js";
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cookieParser())

app.use('/api',route)

app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
    connectMongoDB()
})