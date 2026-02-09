import axios from "axios";
import { useEffect, useState } from "react";
import type { diary, NewDiaryEntry } from "./types";
import Entry from "./components/entry";
import NewEntry from "./components/NewEntry";

const App = () => {
  const [data, setData] = useState<diary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/diaries")
      .then((res) => res.data)
      .then((entries) => {
        setData(entries);
      })
      .catch((err) => console.error(err));
  }, []);

  const addEntry = (entry: NewDiaryEntry) => {
    setError(null);
    axios
      .post("http://localhost:3000/api/diaries", entry)
      .then((res) => res.data)
      .then((created) => setData((prev) => prev.concat(created)))
      .catch((err) => {
        const msg = err?.response?.data || err.message || "Unknown error";
        setError(String(msg));
      });
  };

  return (
    <>
      <div>
        {error && (
          <div style={{ color: "red", whiteSpace: "pre-wrap" }}>{error}</div>
        )}
        <NewEntry onSubmit={addEntry} />
      </div>
      <div>
        <h1>Diary Entries</h1>
        {data.map((entry) => (
          <Entry key={entry.id} entry={entry} />
        ))}
      </div>
    </>
  );
};

export default App;
