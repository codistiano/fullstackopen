import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteForm from "./components/anecdoteForm";
import AnecdoteList from "./components/anecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import { getAllAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllAnecdotes())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
