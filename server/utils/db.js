import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config();

export async function connectToDatabase() {
    try {
      await mongoose.connect(process.env.DATABASE_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      });
  
      console.log('Database connection successfull!');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
}