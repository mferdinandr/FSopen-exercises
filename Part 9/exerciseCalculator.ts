interface calcuValue {
  target: number;
  time: Array<number>;
}

const parseArguments = (args: Array<string>): calcuValue => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const time: Array<number> = [];

  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[2])) && isNaN(Number(args[3]))) {
      throw new Error('Provided value were not numbers!');
    } else {
      time.push(Number(args[i]));
    }
  }

  return {
    target: Number(args[2]),
    time: time,
  };
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDesscription: string;
  target: number;
  average: number;
}

export const calculateExercise = (
  args: Array<number>,
  target: number
): Result => {
  const periodLength = args.length;
  const trainingDays = args.filter((a) => a !== 0).length;
  const average = args.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;

  const rates = (average: number, target: number): number => {
    const rating = average / target;
    if (rating >= 1) {
      return 3;
    } else if (rating >= 0.9) {
      return 2;
    } else {
      return 1;
    }
  };

  const desscriptions = (rating: number): string => {
    if (rating === 1) {
      return 'More time exercising would do you good';
    } else if (rating === 2) {
      return 'Not too bad but could be better';
    } else {
      return 'Excellent';
    }
  };

  const rating = rates(average, target);
  const ratingDesscription = desscriptions(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDesscription,
    target,
    average,
  };
};

try {
  const { target, time } = parseArguments(process.argv);
  console.log(calculateExercise(time, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
