import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
    const height = parseFloat(req.query.height as string);
    const weight = parseFloat(req.query.weight as string);
  
    if (!height || !weight || isNaN(height) || isNaN(weight)) {
      return res.status(400).json({ error: 'malformatted parameters' });
    };
  
    if (height <= 30 || height > 300) {
      return res.status(400).json({
        error: 'Height must be in cm, ranging between 30cm and 300cm.',
      });
    };

    if (weight < 30 || weight > 300) {
        return res.status(400).json({
            error: 'Weight must be in kg, ranging between 30kg and 300kg.',
          });
    };
  
    const bmi = calculateBmi(height, weight);
  
   return res.json({
      weight,
      height,
      bmi,
      });
    });

app.post('/exercises', (req: Request, res: Response) => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { daily_exercises, target }: { daily_exercises: any; target: any } = req.body;
      
    if (!daily_exercises || target === undefined) {
        return res.status(400).json({ error: 'parameters missing' });
    }
      
    if (
        !Array.isArray(daily_exercises) ||
        daily_exercises.some((hours) => isNaN(hours)) ||
        isNaN(target)
    ) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }
      
  const result = calculateExercises(daily_exercises, target);
      
  return res.json(result);
});
  
const PORT = 3003;

app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});
