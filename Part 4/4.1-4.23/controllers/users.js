const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  });
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const body = request.body;

  const saltRounds = 10;
  if (!body.password) {
    return response.status(400).send({ error: 'password must given' });
  }
  if (body.password.length <= 3) {
    return response.status(400).send({ error: 'password length less than 3' });
  }

  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
