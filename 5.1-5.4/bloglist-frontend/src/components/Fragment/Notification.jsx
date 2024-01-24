const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  return (
    <div
      className={`${type} text-white font-bold lg:text-2xl border-2 p-3 mt-5 ${type} mx-auto rounded-lg translate-x-2 pr-7 text-center fixed right-0`}
    >
      {message}
    </div>
  );
};

export default Notification;
