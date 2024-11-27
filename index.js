import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import bodyParser from 'body-parser';
import router from './routes/user.routes.js';

const app = express();
dotenv.config();
connectDB();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/v1', router )

const PORT = process.env.PORT || 6000;

app.listen(PORT, () =>{
    console.log(`Server Running at ${PORT}`);
})