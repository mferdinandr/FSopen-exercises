interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDesscription: string;
  target: number;
  average: number;
}

const calculateExercise = (args: Array<number>, target: number): Result => {
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

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2));
