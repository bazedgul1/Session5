import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import bodyParser from 'body-parser';
import router from './routes/user.routes.js';
import errorHandle from './middleware/errorHandler.js';

const app = express();
dotenv.config();
connectDB();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/v1', router )

// Fallback Route for 404 errors

app.use((req,res,next)=> {
    const error = new Error("Route not Found");
    error.statusCode = 404;
    next(error)
});

app.use(errorHandle);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () =>{
    console.log(`Server Running at ${PORT}`);
})