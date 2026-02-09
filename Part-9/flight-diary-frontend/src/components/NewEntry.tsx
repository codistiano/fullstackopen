import { useState } from "react";

interface Props {
  onSubmit: (entry: {
    date: string;
    visibility: string;
    weather: string;
    comment: string;
  }) => void;
}

const NewEntry = ({ onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit({ date, visibility, weather, comment });
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <>
      <h1>Add new entry</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input type="text" value={date} onChange={({ target }) => setDate(target.value)} name="date" /> <br />
        <label htmlFor="visibility">Visibility</label>
        <input type="text" value={visibility} onChange={({ target }) => setVisibility(target.value)} name="visibility" />  <br />
        <label htmlFor="weather">Weather</label>
        <input type="text" value={weather} onChange={({ target }) => setWeather(target.value)} name="weather" /> <br />
        <label htmlFor="comment">Comment</label>
        <input type="text" value={comment} onChange={({ target }) => setComment(target.value)} name="comment" /> <br />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default NewEntry;
