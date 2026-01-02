import { createSlice } from "@reduxjs/toolkit";
import anecdotes from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return state.map((anecdote) => 
        anecdote.id === action.payload ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
      )
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

const { setAnecdotes, addAnecdote } = anecdoteSlice.actions

export const getAllAnecdotes = () => {
  return async (dispatch) => {
    const initialAnecdotes = await anecdotes.getAll()
    dispatch(setAnecdotes(initialAnecdotes))
  }
}

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const addedAnecdote = await anecdotes.createNew(content)
    dispatch(addAnecdote(addedAnecdote))
  }
}

export const { voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
