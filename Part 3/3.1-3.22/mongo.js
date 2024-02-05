const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument: node mongo.js <password>');
  process.exit(1);
}

if (process.argv.length > 5) {
  console.log(
    'Please provide maximum the 5 arguments: node mongo.js <password> <name> <number>'
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://FerdinandR:${password}@fullstackopencourse.7faksyi.mongodb.net/Phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name,
  number,
});

process.argv.length > 3
  ? person.save().then((result) => {
      console.log(`Added ${name} number: ${number} to phonebook`);
      mongoose.connection.close();
    })
  : Person.find({}).then((result) => {
      console.log('phonebook :');
      result.forEach((person) => {
        console.log(person.name, person.number);
      });
      mongoose.connection.close();
    });
