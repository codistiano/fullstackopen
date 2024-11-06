import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(persons);

  const filterer = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setResults(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkName = persons.some((person) => person.name === newName);

    if (checkName) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newObj = persons.concat({
      name: newName,
      number: newNum,
      id: persons.length + 1,
    });
    setPersons(newObj);
    setResults(newObj);
    setNewName("");
    setNewNum("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        Filter shown with <input onChange={filterer} value={search} />
      </p>
      <form>
        <div>
          name:{" "}
          <input onChange={(e) => setNewName(e.target.value)} value={newName} />
        </div>
        <br />
        <div>
          number:{" "}
          <input onChange={(e) => setNewNum(e.target.value)} value={newNum} />
        </div>
        <br />
        <div>
          <button onClick={handleSubmit} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {results.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
