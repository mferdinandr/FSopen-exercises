import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/anecdoteReducer';
import { mute, notify } from '../reducers/notificationReducer';

import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createNote(newAnecdote))

    dispatch(notify(`'${content}' added`));
    setTimeout(() => {
      dispatch(mute());
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div>
          <input name="note" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
