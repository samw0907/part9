export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ** 2);
  
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'Normal range';
    } else {
      return 'Overweight';
    }
  };

if (require.main === module) {
    const args = process.argv.slice(2);
  
    if (args.length !== 2) {
        console.error('Please provide height (cm) and weight (kg) as arguments.');
        process.exit(1);
    };
  
    const height = Number(args[0]);
    const weight = Number(args[1]);

    if (isNaN(height) || isNaN(weight)) {
    console.error('Both height and weight must be valid numbers.');
    process.exit(1);
    };

    if (height <= 30 || height > 300) {
        console.error('Height must be in cm, ranging between 30cm and 300 cm.');
        process.exit(1);
    };
  
    if (weight < 30 || weight > 300) {
        console.error('Weight must in kg, ranging between 30kg and 300kg.');
        process.exit(1);
    };

    console.log(calculateBmi(height, weight));
};