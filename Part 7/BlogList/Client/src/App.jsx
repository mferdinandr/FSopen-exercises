import { useState, useEffect, useRef } from 'react';

import blogService from './services/blogs';
import Notification from './components/Fragment/Notification';
import Blogs from './components/Pages/Blogs';
import LoginForm from './components/Pages/LoginForm';

import './index.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState('error');

  const blogAddRef = useRef(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <>
      <Notification type={typeMessage} message={message}></Notification>

      <div>
        {user === null ? (
          <LoginForm
            setUser={setUser}
            setMessage={setMessage}
            setTypeMessage={setTypeMessage}
          ></LoginForm>
        ) : (
          <Blogs
            setUser={setUser}
            user={user}
            blogAddRef={blogAddRef}
            setMessage={setMessage}
            setTypeMessage={setTypeMessage}
          />
        )}
      </div>
    </>
  );
};

export default App;
