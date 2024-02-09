interface Values {
  value1: number;
  value2: number;
}

const parseArgument = (args: Array<string>) => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('To many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Provided value were not numbers!');
  }
};

const calculateBmi = (height: number, mass: number) => {
  const bmi = mass / ((height / 100) ^ 2);
  if (bmi <= 16) {
    console.log('Underweight (Severe thinness)');
  } else if (bmi >= 16 && bmi <= 16.9) {
    console.log('Underweight (Moderate thinness)');
  } else if (bmi >= 17 && bmi <= 18.4) {
    console.log('Underweight (Mild thinness)');
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    console.log('Normal Range');
  } else if (bmi >= 25 && bmi <= 29.9) {
    console.log('Overweight (Pre-obese)');
  } else if (bmi >= 30 && bmi <= 34.9) {
    console.log('Obese (Class I)');
  } else if (bmi >= 35 && bmi <= 39.9) {
    console.log('Obese (Class II)');
  } else if (bmi >= 40) {
    console.log('Obese (Class III)');
  } else {
    throw new Error('Provided number were not number!');
  }
};

try {
  const { value1, value2 } = parseArgument(process.argv);
  calculateBmi(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
