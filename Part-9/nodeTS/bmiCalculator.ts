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

console.log(calculateBmi(180, 74))

