import { createContext, useContext, useReducer } from 'react';

const notifyReducer = (state, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return [action.payload, action.color];
    case 'MUTE':
      return;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotifcationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotifcationDispatch = () => {
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
