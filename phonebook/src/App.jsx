import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import services from "./services/personservices";
import SuccessBanner from "./components/SuccessBanner";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [filteredList, setFilteredList] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

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
    // axios.get("http://localhost:3001/persons").then((response) => {
    //   setPersons(response.data);
    // });
    services.getPersons().then((response) => {
      console.log("response", response);
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

    const contactExists = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    // if (contactExists) {
    //   if (window.confirm("Do you want to update this persons number")) {
    //     const preExistingContact = persons.find(
    //       (person) => person.name.toLowerCase() === newName.toLowerCase()
    //     );
    //     const changedContact = { ...preExistingContact, number: newNumber };
    //     services
    //       .update(preExistingContact.id, changedContact)
    //       .then((response) => setPersons(response.data));
    //   }
    //   return;
    // } else {
    //   const newContact = {
    //     // id: crypto.randomUUID(),
    //     name: newName,
    //     number: newNumber,
    //   };

    //   services.create(newContact).then((response) => {
    //     return setPersons(response.data);
    //   });

    //   setShowSuccess(true);
    //   setTimeout(() => setShowSuccess(false), "3000");
    // }

    const newContact = {
      name: newName,
      number: newNumber,
    };
    services.create(newContact).then((returnedContact) => {
      console.log(returnedContact.data);
      setPersons(persons.concat(returnedContact.data));
      setNewName("");
      setNewNumber("");
    });
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
      <SuccessBanner show={showSuccess} />
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
