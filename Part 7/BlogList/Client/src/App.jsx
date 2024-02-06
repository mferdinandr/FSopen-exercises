import { useEffect, useRef } from 'react';

import blogService from './services/blogs';
import Notification from './components/Fragment/Notification';
import Blogs from './components/Pages/Blogs';
import LoginForm from './components/Pages/LoginForm';

import './index.css';
import { useNotifcationValue } from './NotificationContext';
import { useLoginDispatch, useLoginValue } from './LoginContext';

const App = () => {
  const user = useLoginValue();
  const setUser = useLoginDispatch();
  const notification = useNotifcationValue();

  const blogAddRef = useRef(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser({ type: 'SET', payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <>
      {notification && (
        <Notification
          type={notification[1]}
          notification={notification[0]}
        ></Notification>
      )}
      <div>
        {user === false ? (
          <LoginForm setUser={setUser}></LoginForm>
        ) : (
          <Blogs setUser={setUser} user={user} blogAddRef={blogAddRef} />
        )}
      </div>
    </>
  );
};

export default App;
