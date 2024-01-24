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

import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage('Wrong Username or Password');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };

  const loginForm = () => {
    return (
      <>
        <Section titleSection={'Log In to Application'}>
          <form onSubmit={handleLogin}>
            <Input
              type="text"
              value={username}
              name="Username"
              label="Username"
              onChange={({ target }) => setUsername(target.value)}
            ></Input>
            <Input
              type="password"
              value={password}
              name="Password"
              label="Password"
              onChange={({ target }) => setPassword(target.value)}
            ></Input>
            <button type="submit">login</button>
          </form>
        </Section>
      </>
    );
  };

  const blogForm = () => {
    return (
      <div>
        <div>
          <h2>Blogs</h2>
          <button type="submit" onClick={handleLogout}>
            logout
          </button>
          <p>{user.name} logged in</p>

          <Togglable buttonLabel={'New blog'} ref={blogAddRef}>
            <CreateBlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              blogAddRef={blogAddRef}
              messageBlogAdd={'Success'}
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
      <Notification type={'error'} message={message}></Notification>
      <div>{user === null ? loginForm() : blogForm()}</div>
    </>
  );
};

export default App;
