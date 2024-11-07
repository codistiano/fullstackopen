import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

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
  const [result, setResult] = useState(persons);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = persons.concat({
      name: newName,
      number: newNum,
      id: persons.length + 1,
    });

    setPersons(newPerson);
    setResult(newPerson);
    setNewName("");
    setNewNum("");
  };

  const filtering = (e) => {
    const searchedKey = e.target.value;
    setSearch(searchedKey);
  
      const filtered = persons.filter((person) => {
        return person.name.toLowerCase().includes(searchedKey.toLowerCase());
      });

      setResult(filtered);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filtering={filtering} search={search}  />
      <h3>Add a new</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} newNum={newNum} setNewName={setNewName} setNewNum={setNewNum}  />
      <h2>Numbers</h2>
      <Persons result={result}  />
    </div>
  );
};

export default App;
