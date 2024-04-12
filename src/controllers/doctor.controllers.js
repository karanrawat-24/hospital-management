import { Doctor } from '../models/doctor.models.js';

export const signup = async (req, res) => {
  try {
    const { name, username, password, speciality } = req.body;
    const doctor = await Doctor.create({
      name,
      username,
      password,
      speciality,
    });

    return res.status(200).json({
      message: 'doctor registered successfully',
      doctorId: doctor._id,
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
    const doctor = await Doctor.findOne({ username, password });
    if (doctor) {
      res.status(200).json({
        message: 'doctor signed in successfully',
        doctorId: doctor._id,
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

export const availability = async (req, res) => {
  try {
    const { doctorId, slotRange } = req.body;
    const doctor = await Doctor.findById(doctorId);
    if (doctor) {
      const [start, end] = slotRange
        .split('-')
        .map((slot) => parseInt(slot.trim()));
      console.log(doctor);
      console.log(start, end);
      if (
        !isNaN(start) &&
        !isNaN(end) &&
        start < end &&
        start >= 9 &&
        end <= 21
      ) {
        for (let slot = start; slot < end; slot++) {
          if (!doctor.availabelSlots.includes(slot)) {
            doctor.availabelSlots.push(slot);
          }
        }
        await doctor.save();
        res.status(200).json({
          message: 'Availability is added',
        });
      } else {
        res.status(400).json({
          message: 'Invalid availability range',
        });
      }
    } else {
      res.status(400).json({
        message: 'Doctor not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
