import mongoose from 'mongoose';

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      dbName: 'hospital-management',
    });
  } catch (error) {
    console.log('error while connecting to db');
  }
}

