/* eslint-disable react/prop-types */
import { useState } from "react";

// Input part of the app
const Btn = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const FeedbackBtns = ({ goodBtn, neutralBtn, badBtn }) => {
  return (
    <div>
      <h1>Give Feedback</h1>
      <Btn text="Good" onClick={goodBtn} />
      <Btn text="Neutral" onClick={neutralBtn} />
      <Btn text="Bad" onClick={badBtn} />
    </div>
  );
};

// Output part of the app
const StatisticLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good + neutral + bad) / 3;
  const positive = ((good - bad) * 100) / (good + neutral + bad);

  const feedbackAvailable = good + neutral + bad == 0;

  if (feedbackAvailable) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No Feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </table>
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
