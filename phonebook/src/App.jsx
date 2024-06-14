import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import services from "./services/personservices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [filteredList, setFilteredList] = useState([]);

  const handleFilter = (event) => {
    const filterPerson = event.target.value;
    if (filterPerson.length > 0) {
      setShowAll(false);
      setFilteredList(filterList(filterPerson));
    } else {
      setShowAll(true);
    }
  };

  useEffect(() => {
    services.getPersons().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleDelete = (person) => {
    const deletedId = person.id;
    services.deleteContact(person.id);
    const updatedList = persons.filter((person) => person.id !== deletedId);

    setPersons(updatedList);
  };

  const filterList = (filterPerson) => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filterPerson.toLowerCase())
    );
    return filteredPersons;
  };

  const handleNewName = (event) => {
    const newPerson = event.target.value;
    setNewName(newPerson);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const personExists = persons.some(
      (person) => person.name.toLowerCase() === personObject.name.toLowerCase()
    );
    if (personExists) {
      alert(`${personObject.name} is already added to the phonebook`);
      return;
    } else {
      services
        .create(personObject)
        .then((response) => setPersons(persons.concat(response.data)));
    }
  };

  const handlers = {
    handleNewName: handleNewName,
    handleNewNumber: handleNewNumber,
  };
  const newContactInfo = {
    newName: newName,
    newNumber: newNumber,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        handlers={handlers}
        newContactInfo={newContactInfo}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        showAll={showAll}
        filteredList={filteredList}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
