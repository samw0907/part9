import express from 'express';
import diagnosesService from '../services/diagnosesService';

const diagnosesRouter = express.Router();

console.log('Diagnoses Router Initialized');

diagnosesRouter.get('/', (_req, res) => {
  console.log('GET /api/diagnoses called');
  const diagnoses = diagnosesService.getEntries();
  res.json(diagnoses);
});

diagnosesRouter.post('/', (_req, res) => {
  res.send('Saving diagnoses!');
});

export default diagnosesRouter;