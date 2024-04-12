import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
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
    speciality: {
      type: String,
      enum: [
        'Cardiologist',
        'Dermatologist',
        'Orthopedic',
        'General Physician',
      ],
      require: true,
    },
    availabelSlots: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);
export { Doctor };
