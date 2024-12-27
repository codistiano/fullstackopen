import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
 const anecdotes = useSelector((state) => {
    if ( state.filter === null ) {
      return anecdotes
    }
    const regex = new RegExp( state.filter, 'i' )
    return state.anecdote.filter(anecdote => anecdote.content.match(regex))
  })
  const dispatch = useDispatch()

  const basedOnVotes = (e1, e2) => e2.votes - e1.votes;

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  return (
    <>
      {anecdotes.sort(basedOnVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;