import { useDispatch } from 'react-redux';
import { onFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(onFilter(event.target.value));
  };
  const style = {
    marginBottom: 11,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
