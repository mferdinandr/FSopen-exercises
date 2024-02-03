import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdotes } from '../services/anecdote-service';
import {
  useNotificationDispatch,
  useNotificationValue,
} from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notification = useNotificationValue();
  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    },
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate(content, {
      onError: () => {
        dispatch({
          type: 'SHOW',
          payload: `an error occurred while creating '${content}', use at least 5 characters for`,
        });
        setTimeout(() => {
          dispatch({ type: 'MUTE' });
        }, 5000);
      },
      onSuccess: () => {
        dispatch({
          type: 'SHOW',
          payload: `'${content}' created`,
        });
        setTimeout(() => {
          dispatch({ type: 'MUTE' });
        }, 5000);
      },
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
