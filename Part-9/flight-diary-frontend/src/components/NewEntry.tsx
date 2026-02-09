import { useState } from "react";
import type { Weather, Visibility, NewDiaryEntry } from "../types";

interface Props {
  onSubmit: (entry: NewDiaryEntry) => void;
}

const weatherOptions: Weather[] = [
  "sunny",
  "rainy",
  "cloudy",
  "stormy",
  "windy",
];
const visibilityOptions: Visibility[] = ["great", "good", "ok", "poor"];

const NewEntry = ({ onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(
    visibilityOptions[0],
  );
  const [weather, setWeather] = useState<Weather>(weatherOptions[0]);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit({ date, visibility, weather, comment });
    setDate("");
    setVisibility(visibilityOptions[0]);
    setWeather(weatherOptions[0]);
    setComment("");
  };

  return (
    <>
      <h1>Add new entry</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          name="date"
        />
        <br />

        <fieldset>
          <legend>Visibility</legend>
          {visibilityOptions.map((opt) => (
            <label key={opt} style={{ marginRight: 8 }}>
              <input
                type="radio"
                name="visibility"
                value={opt}
                checked={visibility === opt}
                onChange={() => setVisibility(opt)}
              />
              {opt}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Weather</legend>
          {weatherOptions.map((opt) => (
            <label key={opt} style={{ marginRight: 8 }}>
              <input
                type="radio"
                name="weather"
                value={opt}
                checked={weather === opt}
                onChange={() => setWeather(opt)}
              />
              {opt}
            </label>
          ))}
        </fieldset>

        <label htmlFor="comment">Comment</label>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          name="comment"
        />
        <br />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default NewEntry;
