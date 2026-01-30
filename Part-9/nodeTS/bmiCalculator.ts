interface BmiValues {
    weight: number;
    height: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
        height: Number(args[2]),
        weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

function calculateBmi(height: number, weight: number): string {
    let bmi = weight / ((height / 100) ** 2)
    if (bmi < 18.5) {
        return 'Underweight'
    } else if (bmi > 24.5) {
        return 'Overweight'
    } else {
        return 'Normal range'
    }
}

let { weight, height } = parseArguments(process.argv)

console.log(calculateBmi(weight, height))

