import { useState } from "react";

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(8).fill(0)); 

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const rndInd = () => {
    const rndNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(rndNum);
  };

  const vote = (i) => {
    const updatedVotes = [...votes];
    updatedVotes[i] += 1;
    setVotes(updatedVotes);
  };

  const highestVote = Math.max(...votes);
  const highestVoteIndex = votes.indexOf(highestVote);

  return (
    <div>
      {anecdotes[selected]} <br />
      {votes[selected] > 0  && (
        <>
          <p>has {votes[selected]} votes</p>
          <br />
        </>
      )}
      <button onClick={() => vote(selected)}>Vote</button>
      <button onClick={rndInd}>Next Anecdote</button>
      {highestVote > 0 && ( 
        <div>
          <h3>Anecdote with most votes</h3>
          {anecdotes[highestVoteIndex]} <br />
          <p>has {highestVote} votes</p>
        </div>
      )}
    </div>
  );
};

export default App;
