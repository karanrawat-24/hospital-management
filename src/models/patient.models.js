import mongoose from 'mongoose'

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    bookings: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

export const Patient = mongoose.model('Paitent',patientSchema);
