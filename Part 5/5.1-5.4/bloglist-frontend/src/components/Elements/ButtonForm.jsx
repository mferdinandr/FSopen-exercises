import PropTypes from 'prop-types';

const ButtonForm = ({ children }) => {
  return (
    <button
      type="submit"
      className="mt-2 border-2 rounded-lg border-white text-white bg-blue-500 p-1 mx-auto w-full hover:text-blue-500 hover:bg-white hover:border-blue-500 font-semibold text-lg"
    >
      {children}
    </button>
  );
};

ButtonForm.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ButtonForm;
