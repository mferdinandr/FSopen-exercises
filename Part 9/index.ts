import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello full stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(weight) || isNaN(height)) {
    res.send({ error: 'malformatted parameters' }).status(400);
  }

  const bmi = calculateBmi(height, weight);

  const bmiData = {
    weight,
    height,
    bmi,
  };
  res.send(bmiData).status(200);
});

app.post('/exercise', (req, res) => {
  const body = req.body;
  const daily_exercises: Array<number> = body.daily_exercises;
  const target: number = body.target;

  if (!target || !daily_exercises) {
    res.status(400).send({ error: 'parameters missing' });
  }

  if (isNaN(target) || daily_exercises.some(isNaN)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  try {
    const result = calculateExercise(daily_exercises, target);
    res.send({ result }).status(200);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    }
    res.status(400).send({ error: 'something went wrong' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
