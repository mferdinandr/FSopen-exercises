import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getAnecdotes, updateAnecdote } from './services/anecdote-service';
// import { useNotifyDispatch } from './components/Notification';
import { useReducer } from 'react';

const App = () => {
  const queryClient = useQueryClient();

  const notifyReducer = (state, action) => {
    switch (action.type) {
      case 'SHOW':
        return action.payload;
      default:
        return '';
    }
  };

  const [notify, notifyDispatch] = useReducer(notifyReducer, '');

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
    notifyDispatch({
      type: 'SHOW',
      payload: `anecdote '${anecdote.content}' voted`,
    });
    setTimeout(() => {
      notifyDispatch({ type: 'MUTE' });
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

      <Notification notification={notify}></Notification>
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
