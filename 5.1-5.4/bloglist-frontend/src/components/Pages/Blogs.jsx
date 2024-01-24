import Section from '../Fragments/Section';
import ButtonClick from '../Fragments/ButtonClick';
import Togglable from '../Fragments/Togglable';
import Blog from '../Blog';
import blogService from '../../services/blogs';
import { useState, useEffect } from 'react';
import BlogForm from '../BlogForm';

const Blogs = ({ setUser, user, blogAddRef }) => {
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
    <div className='mx-10 my-5'>
      <div className="flex justify-between">
        <Section titleSection={'Blogs'} />
        <ButtonClick onClick={handleLogout} color1="red">
          Logout
        </ButtonClick>
      </div>

      <h2><span className='font-bold'>{user.name}</span> logged in</h2>

      <Togglable buttonLabel={'New blog'} ref={blogAddRef}>
        <BlogForm />
      </Togglable>


      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
