import PropTypes from 'prop-types';

const Input = ({ type, value, name, onChange, label }) => {
  return (
    <div className="py-2 px-1 flex flex-col">
      <label className="font-bold">{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className="border-2 border-black py-2 px-3 rounded-md font-normal text-sm sm:font-medium "
        required
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Input;
