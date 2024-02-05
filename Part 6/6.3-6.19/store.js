import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer, { setAnecdote } from './src/reducers/anecdoteReducer';
import filterReducer from './src/reducers/filterReducer';
import notificationReducer from './src/reducers/notificationReducer';

import anecdoteService from './src/services/anecdotes';

const store = configureStore({
  reducer: {
    notes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

anecdoteService.getAll().then((anec) => store.dispatch(setAnecdote(anec)));

export default store;
