import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getAnecdotes, updateAnecdote } from './services/anecdote-service';
// import { useNotifyDispatch } from './components/Notification';
import { useReducer } from 'react';
import {
  useNotificationDispatch,
  useNotificationValue,
} from './NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const notification = useNotificationValue();
  const dispatch = useNotificationDispatch();

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote.id);
    dispatch({
      type: 'SHOW',
      payload: `anecdote '${anecdote.content}' voted`,
    });
    setTimeout(() => {
      dispatch({ type: 'MUTE' });
    }, 5000);
  };

  if (result.isLoading) {
    return <div>Loading data....</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notification={notification}></Notification>
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
