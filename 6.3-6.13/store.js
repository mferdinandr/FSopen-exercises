import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from './src/reducers/anecdoteReducer';
import filterReducer from './src/reducers/filterReducer';

const store = configureStore({
  reducer: {
    notes: anecdoteReducer,
    filter: filterReducer,
  },
});

export default store;
