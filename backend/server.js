
import express from 'express' ;
import dotenv from 'dotenv'
import dbConnection from './config/db.js';
import cookieParser from 'cookie-parser';
import path from 'path';


import authRoutes from './routes/auth.route.js'
import studentRoutes from './routes/student.route.js'
import { errorHandler } from './utils/error.js';



dotenv.config();

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser())



// calling routes here 

app.use('/api/auth',authRoutes)
app.use('/api/student',studentRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`);
    dbConnection();
})




app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });