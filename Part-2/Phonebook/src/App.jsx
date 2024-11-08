import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
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

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
      setResult(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filtering={filtering} search={search} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNum={newNum}
        setNewName={setNewName}
        setNewNum={setNewNum}
      />
      <h2>Numbers</h2>
      <Persons result={result} />
    </div>
  );
};

export default App;
