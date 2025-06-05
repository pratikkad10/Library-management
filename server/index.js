import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectToDatabase } from './utils/db.js'
import userRoutes from './routes/user.routes.js'
import cloudinaryConnect from './utils/cloudinary.js'
import fileUpload from 'express-fileupload'
import bookRoutes from './routes/books.routes.js'
import adminRoutes from './routes/admin.routes.js'


dotenv.config()
const app=express()
connectToDatabase()
cloudinaryConnect()
const port=process.env.PORT || 8080

app.use(
    cors({
      origin: process.env.BASE_URL,
      credentials: true,
      methods: ["GET", "POST", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(fileUpload({
  useTempFiles: true, // Allows storing files temporarily for processing
  tempFileDir: '/tmp/' // Temporary directory for file uploads
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/admin', adminRoutes);

app.get('/', (req,res)=>{
    res.send("Hey there..........!")
})

app.listen(port, (req,res)=> console.log(`server is listening on port ${port}`))
