import PropTypes from 'prop-types';

const ButtonClick = ({ children, onClick, type }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`mt-2 border-2 rounded-xl px-3 py-0.5 ${type}`}
    >
      {children}
    </button>
  );
};

ButtonClick.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ButtonClick;
