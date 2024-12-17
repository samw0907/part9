interface ExerciseCalculator {
    numberOfDays: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  };

export const calculateExercises = (hoursPerDay: number[], target: number): ExerciseCalculator => {
    const numberOfDays = hoursPerDay.length;
    const trainingDays = hoursPerDay.filter((hours) => hours > 0).length;
    const totalHours = hoursPerDay.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / numberOfDays;
    const success = average >= target;
  
    let rating: number;
    let ratingDescription: string;
  
    if (average >= target) {
      rating = 3;
      ratingDescription = 'strong effort, keep up the good work';
    } else if (average >= target * 0.75) {
      rating = 2;
      ratingDescription = 'not too bad but could do better';
    } else {
      rating = 1;
      ratingDescription = 'get moving lazy bones';
    };
  
    return {
      numberOfDays,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average,
    };
  };
  
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Provide first the target daily exercise hours, followed by at least one daily total hours value');
    process.exit(1);
  };
  
  const target = Number(args[0]);
  const dailyHours = args.slice(1).map((arg) => Number(arg));
  
  if (dailyHours.some(isNaN) || isNaN(target)) {
    console.error('Provided values were not numbers!');
    process.exit(1);
  };

  if (dailyHours.some((hours) => hours > 24)) {
    console.error('Hey! No cheating!');
    process.exit(1);
  };
  
  console.log(calculateExercises(dailyHours, target));
  