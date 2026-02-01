import express from "express";
import calculateBmi from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    let { height, weight } = req.query

    if (height === undefined || weight === undefined) {
      res.json({
        error: "malformatted parameters"
      })
      return
    }

    let bmi = calculateBmi(Number(height), Number(weight))

    res.json({
      weight,
      height,
      bmi
    })

})

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
