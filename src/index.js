import dotenv from 'dotenv';
import express from 'express';
import { connectToDB } from './db/index.js';
import { router as doctorRouter } from './routes/doctor.routes.js';
import { router as patientRouter } from './routes/patient.routes.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectToDB();

app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/patient', patientRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on Port no: ${process.env.PORT || 8080}`);
});
