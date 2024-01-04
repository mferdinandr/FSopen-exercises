const express = require('express');
const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  response.json(notes);
});

app.get('/info', (request, response) => {
  const people = notes.length;
  const now = new Date(Date.now()).toString();
  response.send(`
  <p>Phonebook has info for ${people} people</p>
  <p>${now}</p>`);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.statusMessage = `id ${id} not found at notes`;
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id != id);

  response.status(204).end();
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post('/api/persons', (request, response) => {
  const body = request.body;
  const checkName = notes.map((n) => n.name === body.name);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    });
  } else if (checkName.find((n) => n === true)) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const note = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  notes = notes.concat(note);
  response.json(note);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
