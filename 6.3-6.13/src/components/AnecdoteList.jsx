import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { voteNote } from '../reducers/anecdoteReducer';
import { notify, mute } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes;
    }
    return filter
      ? notes.filter((note) => note.content.toLowerCase().includes(filter))
      : notes;
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteNote(anecdote.id));
    dispatch(notify(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(mute());
    }, 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
