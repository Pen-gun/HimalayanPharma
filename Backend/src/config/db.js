import mongoose from 'mongoose';
import { DB_NAME } from "../constant.js";

const connectToDB = async () => {
  try {
    const mongoURL = `${process.env.MONGODB_URL}/${DB_NAME}`;

    const conn = await mongoose.connect(mongoURL);

    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectToDB;
