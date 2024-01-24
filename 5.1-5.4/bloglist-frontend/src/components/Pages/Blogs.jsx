import Section from '../Elements/Section';
import ButtonClick from '../Elements/ButtonClick';
import Togglable from '../Elements/Togglable';
import Blog from '../Fragment/Blog';
import blogService from '../../services/blogs';
import { useState, useEffect } from 'react';
import BlogForm from '../Fragment/BlogForm';

const Blogs = ({ setUser, user, blogAddRef, setMessage, setTypeMessage }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <div className="mx-7 sm:mx-20 my-5">
      <div className="flex justify-between">
        <Section titleSection={'Blogs'} />
        <ButtonClick onClick={handleLogout} color1="red">
          Logout
        </ButtonClick>
      </div>

      <h2 className="text-lg">
        <span className="font-bold">{user.name}</span> logged in
      </h2>

      <Togglable
        buttonLabelToOpen={'New blog'}
        buttonLabelToClose={'Close'}
        ref={blogAddRef}
      >
        <BlogForm
          blogAddRef={blogAddRef}
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage={setMessage}
          setTypeMessage={setTypeMessage}
        />
      </Togglable>

      <div className="mt-5">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
