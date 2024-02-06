import PropTypes from 'prop-types';

const Notification = ({ notification, type }) => {
  if (!notification) {
    return;
  }
  return (
    <div
      className={`${type} text-white font-bold lg:text-xl border-2 p-3 mt-5 ${type} mx-auto rounded-lg translate-x-2 pr-7 text-center fixed right-0`}
    >
      {notification}
    </div>
  );
};

Notification.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Notification;
