const Button = ({ children }) => {
  return (
    <button type="submit" className="mt-2 border-2 rounded-lg border-white text-white bg-blue-500 p-1 mx-auto w-full hover:text-blue-500 hover:bg-white hover:border-blue-500">
      {children}
    </button>
  );
};

export default Button;
