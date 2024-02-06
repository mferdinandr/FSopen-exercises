import { createContext, useContext, useReducer } from 'react';

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'REMOVE':
      return false;
    default:
      return state;
  }
};

const LoginContext = createContext();

export const useLoginValue = () => {
  const notificationAndDispatch = useContext(LoginContext);
  return notificationAndDispatch[0];
};

export const useLoginDispatch = () => {
  const notificationAndDispatch = useContext(LoginContext);
  return notificationAndDispatch[1];
};

export const LoginContextProvider = ({ children }) => {
  const [login, loginDispatch] = useReducer(loginReducer, false);

  return (
    <LoginContext.Provider value={[login, loginDispatch]}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
