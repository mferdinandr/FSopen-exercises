import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/anecdoteReducer';
import { mute, notify } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    dispatch(createNote(content));

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
