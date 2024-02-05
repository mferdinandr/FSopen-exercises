import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';
const getId = () => (100000 * Math.random()).toFixed(0);

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createAnecdotes = async (content) => {
  const newAnecdote = {
    content,
    id: getId(),
    votes: 0,
  };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

export const updateAnecdote = async (id) => {
  const anecdoteToChange = await axios.get(`${baseUrl}/${id}`);
  const changedAnecdote = {
    ...anecdoteToChange.data,
    votes: anecdoteToChange.data.votes + 1,
  };
  const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote);
  return response.data;
};
