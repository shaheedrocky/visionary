import express from "express"
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000

app.get('/api',(req,res)=>{
    console.log('The api is working...');
    res.json({
        message: 'The Api is working....'
    })
    
})

app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
    
})