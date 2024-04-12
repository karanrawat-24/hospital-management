import express from 'express';
import {
  availability,
  signup,
  singin,
} from '../controllers/doctor.controllers.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', singin);
router.post('/availability', availability);

export { router };
