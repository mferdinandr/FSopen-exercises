const ButtonClick = ({ children, onClick, color1, color2 }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`mt-2 border-2 rounded-xl border-red-600 text-white bg-red-400 px-4 py-1 my-3 hover:bg-white hover:text-red-600`}
    >
      {children}
    </button>
  );
};

export default ButtonClick;
