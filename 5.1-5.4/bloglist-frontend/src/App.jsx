import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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
    } catch {
      console.log('wrong credential');
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
        <h2>Login to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
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

          <BlogForm blogs={blogs} setBlogs={setBlogs}></BlogForm>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    );
  };

  return <div>{user === null ? loginForm() : blogForm()}</div>;
};

export default App;
