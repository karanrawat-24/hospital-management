import { Patient } from '../models/patient.models.js';
import { Doctor } from '../models/doctor.models.js';
export const signup = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const patient = await Patient.create({
      name,
      username,
      password,
    });

    return res.status(200).json({
      message: 'patient registered successfully',
      doctorId: patient._id,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.username) {
      return res.status(400).json({
        message: 'Username is already in use',
      });
    }
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const singin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const patient = await Patient.findOne({ username, password });
    if (patient) {
      res.status(200).json({
        message: 'patient signed in successfully',
        doctorId: patient._id,
      });
    } else {
      res.status(401).json({
        message: 'Invalid username or password',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const findAvailableSlots = async (req, res) => {
  try {
    const { speciality } = req.params;
    const doctors = await Doctor.find({ speciality });
    const availableSlots = doctors.reduce((acc, doctor) => {
      acc[doctor.name] = doctor.availabelSlots;
      return acc;
    }, {});
    return res.status(200).json({
      availableSlots,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
