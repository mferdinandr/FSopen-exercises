import { useState, useEffect } from 'react';
import axios from 'axios';

import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import personService from './services/persons';
import ErrorMessage from './components/ErrorMessage';
import SuccessMessage from './components/SuccessMessage';
import Service from './services/persons';

const App = () => {
  const [id, setId] = useState(0);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [personFilter, setPersonFilter] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('No users found');

  const cari = persons.find((person) => person.name === newName);

  useEffect(() => {
    Service.getAllPersons().then((data) => setPersons(data));
  }, []);

  const addToPhoneBook = () => {
    personService
      .createPerson({ name: newName, number: number })
      .then((response) => {
        setPersons(persons.concat(response));
        setSuccessMessage(`${newName} successfully added to the phone book`);
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    // 3.9
    axios.get('http://localhost:3001/api/persons').then((response) => {
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
        const updatedPerson = { ...cari, number: number };
        personService
          .updatePerson(cari.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setSuccessMessage(`${returnedPerson.name} successfully updated!`);
          })
          .catch((error) => {
            setErrorMessage(`Unable to find and update ${newName}`);
            setPersons(persons.filter((n) => n.id !== cari.id));
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

  const handleDelete = (name, id) => {
    if (
      window.confirm(`Are you sure you want to delete ${name}? (id: ${id})`)
    ) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setSuccessMessage(`${name} successfully deleted`);
        })
        .catch((error) => {
          setErrorMessage(
            `Person ${persons.name} was already removed from server`
          );
        });
    }
  };

  useEffect(() => {
    personService.getAllPersons().then((res) => {
      setPersons(res);
      setErrorMessage(null);
      setSuccessMessage(null);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null);
      setSuccessMessage(null);
    }, 3000);
  }, [errorMessage, successMessage]);

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage message={errorMessage}></ErrorMessage>
      <SuccessMessage message={successMessage}></SuccessMessage>
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
        <Persons
          personFilter={personFilter}
          persons={persons}
          handleDelete={handleDelete}
        ></Persons>
      </ul>
    </div>
  );
};

export default App;
