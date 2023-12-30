import { useState, useEffect } from 'react';
import axios from 'axios';

import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import personService from './services/persons';
import ErrorMessage from './components/ErrorMessage';
import SuccessMessage from './components/SuccessMessage';

const App = () => {
  const [id, setId] = useState(0);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [personFilter, setPersonFilter] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('No users found');

  const checkIfExist = () => persons.name((a) => a.name == newName);
  const cari = persons.find((person) => person.name === newName);

  const addToPhoneBook = () => {
    personService
      .createPerson({ name: newName, number: number })
      .then((response) => {
        setPersons(persons.concat(res));
        setsuccessMessage(`${newName} successfully added to the phone book`);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNumber(event.target.value);
  };

  const handleCounter = () => {
    setId(id + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (cari) {
      if (
        window.confirm(
          `${newName} already exists. Do you want to update the number?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const updatedPerson = { ...person, number: number };
        personService
          .updatePerson(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setSuccessMessage(`${returnedPerson.name} successfully updated!`);
          })
          .catch(() => {
            setErrorMessage(`Unable to find and update ${newName}`);
            setPersons(persons.filter((n) => n.id !== person.id));
          });
      }
    } else {
      addToPhoneBook();
    }
    setNewName('');
    setNumber('');
  };

  const handleChangeFilter = (event) => {
    setPersonFilter(
      persons.filter((person) => person.name.includes(event.target.value))
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChangeFilter={handleChangeFilter}></Filter>
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        number={number}
        handleCounter={handleCounter}
        handleSubmit={handleSubmit}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      ></PersonForm>
      <h2>Numbers</h2>
      <ul>
        <Persons personFilter={personFilter} persons={persons}></Persons>
      </ul>
    </div>
  );
};

export default App;
