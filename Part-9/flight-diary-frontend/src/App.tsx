import axios from "axios";
import { useEffect, useState } from "react";
import type { diary } from "./types";
import Entry from "./components/entry";

const App = () => {
  const [data, setData] = useState<diary[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/diaries").then(res => res.data).then(entries => {
      setData(entries)
    })
  }, []);

  return (
    <>
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
