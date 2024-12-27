import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { displayNotification, removeNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === "") return state.anecdote; 

    const searchKeyword = state.filter.toLowerCase(); 
    return state.anecdote.filter((anecdote) => anecdote.content.toLowerCase().includes(searchKeyword));
  });

  const dispatch = useDispatch()

  const basedOnVotes = (e1, e2) => e2.votes - e1.votes;

  const vote = (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(displayNotification(content))
    setTimeout(() => {
      dispatch(removeNotification(""))
    }, 5000);
  };


  return (
    <>
      {[...anecdotes].sort(basedOnVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;