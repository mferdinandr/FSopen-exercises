import { useEffect } from 'react';
import { useState } from 'react';

const App = () => {
  const [id, setId] = useState(1);
  // const [persons, setPersons] = useState([]);
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');
  const [filtered, setFiltered] = useState();
  const [personFilter, setPersonFilter] = useState([]);

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNumber(event.target.value);
  };

  const handleChangeFilter = (event) => {
    setFiltered(event.target.value);
    setPersonFilter(persons.filter((person) => person.name.includes(filtered)));
    console.log('p[anjang', personFilter);
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with: <input onChange={handleChangeFilter} />
        </div>
      </form>
      <h2>Add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChangeName} value={newName} />
        </div>
        <div>
          number: <input onChange={handleChangeNumber} value={number} />
        </div>
        <div>
          <button type="submit" onClick={handleCounter}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personFilter.length > 0 ? (
        <ul>
          {personFilter.map((person) => {
            return (
              <li key={person.id}>
                {person.name} {person.number}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul>
          {persons.map((person) => {
            return (
              <li key={person.id}>
                {person.name} {person.number}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default App;
