import express from "express";
import calculateBmi from "./bmiCalculator";
import { calculateExercise, argsTypes } from "./exerciseCalculator"
const app = express();

app.use(express.json())

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const { height, weight } = req.query

    if (height === undefined || weight === undefined) {
      return res.json({
        error: "malformatted parameters"
      })
    }

    const bmi = calculateBmi(Number(height), Number(weight))

    return res.json({
      weight,
      height,
      bmi
    })

})

app.post('/exercises', (req, res) => {
  const { daily_exercises, target }: argsTypes = req.body

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: "parametters missing"})
  }

  if (!Array.isArray(daily_exercises) || !daily_exercises.every(e => typeof e === 'number') || isNaN(target)) {
    return res.status(400).json({ error: "malformatted parametters"})
  }

  const daily = daily_exercises.map(d => Number(d))
  const sTarget = Number(target)

  const result = calculateExercise(daily, sTarget)

  return res.json(result)
})

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
