import { useEffect, useRef } from 'react';

import blogService from './services/blogs';
import Notification from './components/Fragment/Notification';
import Blogs from './components/Pages/Blogs';
import LoginForm from './components/Pages/LoginForm';

import './index.css';
import { useNotifcationValue } from './NotificationContext';
import { useLoginDispatch, useLoginValue } from './LoginContext';
import { Route, Routes } from 'react-router-dom';
import Users from './components/Pages/Users';
import { useQuery } from '@tanstack/react-query';
import { UserDetail } from './components/Fragment/User';

const App = () => {
  const user = useLoginValue();
  const setUser = useLoginDispatch();
  const notification = useNotifcationValue();

  const blogAddRef = useRef(null);

  const result = useQuery({
    queryKey: [''],
    queryFn: blogService.getAllUsers,
    refetchOnWindowFocus: false,
  });
  const blogs = result.data;

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

      <Routes>
        {user === false ? (
          <Route
            path="/login"
            element={<LoginForm setUser={setUser}></LoginForm>}
          />
        ) : (
          <Route
            path="/blogs"
            element={
              <Blogs setUser={setUser} user={user} blogAddRef={blogAddRef} />
            }
          />
        )}
        {user && <Route path="/users" element={<Users />} />}
        {user && (
          <Route path="/users/:id" element={<UserDetail blogs={blogs} />} />
        )}
      </Routes>
    </>
  );
};

export default App;
