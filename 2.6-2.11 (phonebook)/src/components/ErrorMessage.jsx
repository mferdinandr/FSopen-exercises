const ErrorMessage = ({ message }) => {
  if (message == NULL) {
    return null;
  }

  return <div>{message}</div>;
};

export default ErrorMessage;
