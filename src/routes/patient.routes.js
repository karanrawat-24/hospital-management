import express from 'express';
import {
  signup,
  singin,
  findAvailableSlots,
} from '../controllers/patient.controllers.js';
import { bookAppointment } from '../controllers/appointment.controllers.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', singin);
router.get('/findslot/:speciality', findAvailableSlots);
router.post('/book-appointment', bookAppointment);

export { router };
