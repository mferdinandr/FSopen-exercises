import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getAnecdotes, updateAnecdote } from './services/anecdote-service';

const App = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  if (result.isLoading) {
    return <div>Loading data....</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
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
