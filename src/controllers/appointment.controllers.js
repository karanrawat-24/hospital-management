import { Doctor } from '../models/doctor.models.js';
import { Patient } from '../models/patient.models.js';
import { Appointment } from '../models/appointment.models.js';

export const bookAppointment = async (req, res) => {
  try {
    let { doctorId, patientId, slot } = req.body;
    slot = parseInt(slot);
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        message: 'patient not found',
      });
    }
    if (patient.bookings.includes(slot)) {
      return res.status(404).json({
        message: 'you already have an appointment at this slot',
      });
    }
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        message: 'doctor not found',
      });
    }
    if (!doctor.availabelSlots.includes(slot)) {
      return res
        .status(400)
        .json({ message: 'Slot is not available for the doctor' });
    }

    const appointment = await Appointment.create({
      doctor: doctorId,
      patient: patientId,
      slot,
    });
    patient.bookings.push(slot);
    doctor.availabelSlots = doctor.availabelSlots.filter(
      (availSlot) => availSlot !== slot
    );
    await doctor.save();
    return res.status(200).json({
      message: 'appointment confirmed',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
