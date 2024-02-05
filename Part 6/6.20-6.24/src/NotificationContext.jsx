import { createContext, useContext, useReducer } from 'react';

const notifyReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload;
    case 'MUTE':
      return '';
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};
export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notifyReducer, '');

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
