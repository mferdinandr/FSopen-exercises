import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';

import Notification from './components/Notification';
import Blogs from './components/Pages/Blogs';

import Section from './components/Fragments/Section';

import LoginForm from './components/Pages/LoginForm';
import ButtonClick from './components/Fragments/ButtonClick';

import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
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

  // const blogForm = () => {
  //   return (
  //     <div>
  //       <div>
  //         <Section titleSection={'Blogs'} />
  //         <ButtonClick onClick={handleLogout} color1={'red'}>
  //           Logout
  //         </ButtonClick>
  //         <h2>{user.name} logged in</h2>

  //         <Togglable buttonLabel={'New blog'} ref={blogAddRef}>
  //           <BlogForm
  //             blogs={blogs}
  //             setBlogs={setBlogs}
  //             blogAddRef={blogAddRef}
  //             setMessage={setMessage}
  //             setTypeMessage={setTypeMessage}
  //           ></BlogForm>
  //         </Togglable>

  //         {blogs.map((blog) => (
  //           <Blog key={blog.id} blog={blog} />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

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
          <Blogs setUser={setUser} user={user} blogAddRef={blogAddRef} />
        )}
      </div>
    </>
  );
};

export default App;
