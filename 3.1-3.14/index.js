const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

require('dotenv').config();

const Person = require('./models/person');

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
morgan.token('request-body', (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :request-body'
  )
);

/* let persons = []; */

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/info', (request, response) => {
  const people = Person.length;
  const now = new Date(Date.now()).toString();
  response.send(`
  <p>Phonebook has info for ${people} people</p>
  <p>${now}</p>`);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = Person.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.statusMessage = `id ${id} not found at notes`;
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  Person = Person.filter((person) => person.id != id);

  response.status(204).end();
});

const generateId = () => {
  const maxId = Person.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

// app.post('/api/persons', (request, response) => {
//   const body = request.body;
//   // const checkName = notes.map((n) => n.name === body.name);

//   // if (!body.name || !body.number) {
//   //   return response.status(400).json({
//   //     error: 'name or number missing',
//   //   });
//   // } else if (checkName.find((n) => n === true)) {
//   //   return response.status(400).json({
//   //     error: 'name must be unique',
//   //   });
//   // }

//   const person = {
//     // id: generateId(),
//     name: body.name,
//     number: body.number,
//   };

//   person = Person.concat(person);
//   response.json(person);
// });
app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => res.json(savedAndFormattedPerson))
    .catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
