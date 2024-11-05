/* eslint-disable react/prop-types */
import { useState } from "react";

// Input part of the app
const FeedbackBtns = ({goodBtn, neutralBtn, badBtn}) => {
  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={goodBtn}>Good</button>
      <button onClick={neutralBtn}>Neutral</button>
      <button onClick={badBtn}>Bad</button>
    </div>
  );
};

// Output part of the app
const Statistics = ({ good, neutral, bad }) => {
  const average = (good + neutral + bad) / 3;
  const positive = (good - bad) / (good + neutral + bad);

  return (
    <div>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Average: {average}</p>
      <p>Positive Feedback: {positive}%</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => {
    setGood((good) => good + 1);
  };

  const addNeutral = () => {
    setNeutral((neutral) => neutral + 1);
  };

  const addBad = () => {
    setBad((bad) => bad + 1);
  };

  return (
    <div>
      <FeedbackBtns goodBtn={addGood} neutralBtn={addNeutral} badBtn={addBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
