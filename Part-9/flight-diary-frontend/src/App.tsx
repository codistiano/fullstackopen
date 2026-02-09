import axios from "axios";
import { useEffect, useState } from "react";
import type { diary } from "./types";
import Entry from "./components/entry";
import NewEntry from "./components/NewEntry";

const App = () => {
  const [data, setData] = useState<diary[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/diaries")
      .then((res) => res.data)
      .then((entries) => {
        setData(entries);
      })
      .catch((err) => console.error(err));
  }, []);

  const addEntry = (entry: { date: string; visibility: string; weather: string; comment: string }) => {
    axios
      .post("http://localhost:3000/api/diaries", entry)
      .then((res) => res.data)
      .then((created) => setData((prev) => prev.concat(created)))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div>
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
