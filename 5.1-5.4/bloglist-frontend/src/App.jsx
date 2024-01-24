import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import CreateBlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Section from './components/Fragments/Section';
import Input from './components/Fragments/Input';
import Button from './components/Fragments/ButtonForm';
import LoginForm from './components/LoginForm';
import ButtonClick from './components/Fragments/ButtonClick';

import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState('error');

  const blogAddRef = useRef(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };

  const blogForm = () => {
    return (
      <div>
        <div>
          <h2>Blogs</h2>
          <ButtonClick onClick={handleLogout} >
            Logout
          </ButtonClick>
          <p>{user.name} logged in</p>

          <Togglable buttonLabel={'New blog'} ref={blogAddRef}>
            <CreateBlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              blogAddRef={blogAddRef}
              setMessage={setMessage}
              setTypeMessage={setTypeMessage}
            ></CreateBlogForm>
          </Togglable>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    );
  };

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
          blogForm()
        )}
      </div>
    </>
  );
};

export default App;
