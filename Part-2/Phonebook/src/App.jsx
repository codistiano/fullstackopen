import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from "./services/persons";
import "./index.css"

const Notification = ({message, errorMessage}) => {
  if (message === null && errorMessage === null) {
    return null
  } 

  if (message) {
    return (
      <div className="message">
        {message}
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  }
  
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(persons);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameExists = persons.filter((person) => person.name === newName);
    const numExists = persons.some((person) => person.number === newNum);

    if (nameExists.length > 0 && !numExists) {
      updateNum(nameExists);
      return;
    } else if (nameExists.length > 0 && numExists) {
      alert(`${nameExists[0].name} already exists in the phonebook!`)
      return;
    }

    const newPerson = {
      name: newName,
      number: newNum,
    };

    personServices
      .create(newPerson)
      .then((data) => {
        setPersons(persons.concat(data));
        setResult(persons.concat(data));
        setMessage(
          `Added '${data.name}' ` 
        )
        setNewName("");
        setNewNum("");
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    })
      .catch((err) => {
        console.log("AN ERROR OCCURRED!")
    })
  };
  
  const updateNum = (theName) => {
    const {id, name, number} = theName[0]

    const approval = window.confirm(`${name} is already added to the phonebook, replace the old number with a new one?`)  

    if (approval) {
      const updatedPerson = {...theName[0], number: newNum}
      personServices
        .update(id, updatedPerson)
        .then(data => {
          setPersons(persons.map(person => (person.id === id ? data : person)))
          setResult(persons.map(person => (person.id === id ? data : person)))
          setNewName("")
          setNewNum("")
        })
        .catch(error => {
          setErrorMessage(`Information of ${updatedPerson.name} has been removed from the server`)
          
          setPersons(persons.filter(person => person.id !== id)); 
          setResult(result.filter(person => person.id !== id));
          setNewName("")
          setNewNum("")
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const filtering = (e) => {
    const searchedKey = e.target.value;
    setSearch(searchedKey);

    const filtered = persons.filter((person) => {
      return person.name.toLowerCase().includes(searchedKey.toLowerCase());
    });

    setResult(filtered);
  };

  useEffect(() => {
    personServices
      .getAll()
      .then(data => {
        setPersons(data)
        setResult(data)
      })
      .catch(err => console.log("AN ERROR OCCURRED!"))
    }, []);
    

  const deleteFunc = (id) => {
    const toBeDeleted = persons.filter(person => person.id === id)

    const approval = window.confirm(`Do you want to delete ${toBeDeleted[0].name} `)
    
    if (approval) {
      personServices
        .deletion(id)
        .then(data => {
          const updatedPersons = persons.filter(person => person.id !== id)
          setPersons(updatedPersons)
          setResult(updatedPersons)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage} />
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
      <Persons result={result} deleteFunc={deleteFunc} />
    </div>
  );
};

export default App;
