import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'doctor',
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    slot: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('appointment', appointmentSchema);

export { Appointment };
