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
  const [successMessage, setsuccessMessage] = useState(null);
  const [errorMessage, seterrorMessage] = useState('No users found');

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
    const cari = persons.find((person) => person.name === newName);
    if (cari) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
    } else {
      setPersons([...persons, { name: newName, id: id, number: number }]);
      setNewName('');
      setNumber('');
    }
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
