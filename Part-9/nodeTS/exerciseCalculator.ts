interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface argsTypes {
  targetInput: number;
  hoursList: number[];
}

const parseArguments = (args: string[]): argsTypes => {
  if (args.length < 4) throw new Error('Not enough arguments');

  for (let i = 2; i < args.length; i++ ) {
    if (isNaN(Number(args[i]))) {
      throw new Error('A provided value is not a number')
    }
  }
  
  const target = Number(args[2])
  const hoursList = args.slice(3).map(Number);

  return {
    targetInput: target,
    hoursList,
  }
}

function calculateExercise(exerciseHours: number[], target: number): Result {
  let daysTrained: number = 0;
  let hoursTrainded: number = 0;
  exerciseHours.forEach((day) => {
    if (day > 0) {
      daysTrained += 1;
      hoursTrainded += day
    }
  });

  const avgTrainingHours = hoursTrainded / exerciseHours.length;

  let success = false;
  if (avgTrainingHours === target) {
    success = true;
  }

  let rating = 3;

  if (avgTrainingHours < target / 3) {
    rating = 1;
  } else if (
    avgTrainingHours < (target / 3) * 2 &&
    avgTrainingHours >= target / 3
  ) {
    rating = 2;
  } else if (avgTrainingHours >= (target / 3) * 2) {
    rating = 3;
  }

  const getRatingDescription = (rating: number): string => {
    switch (rating) {
      case 1:
        return "You need to work harder";
      case 2:
        return "Not too bad but could be better";
      case 3:
        return "Great job!";
    }
  };

  return {
    periodLength: exerciseHours.length,
    trainingDays: daysTrained,
    success,
    rating,
    ratingDescription: getRatingDescription(rating),
    target,
    average: avgTrainingHours,
  };
}

const { targetInput, hoursList } = parseArguments(process.argv)

console.log(calculateExercise(hoursList, targetInput))