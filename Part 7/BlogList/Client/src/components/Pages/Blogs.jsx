import Section from '../Elements/Section';
import ButtonClick from '../Elements/ButtonClick';
import Togglable from '../Elements/Togglable';
import Blog from '../Fragment/Blog';
import blogService from '../../services/blogs';
import { useState, useEffect } from 'react';
import BlogForm from '../Fragment/BlogForm';

import PropTypes from 'prop-types';
import { useNotifcationDispatch } from '../../NotificationContext';

const Blogs = ({ setUser, user, blogAddRef }) => {
  const [blogs, setBlogs] = useState([]);
  const notificationDispatch = useNotifcationDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
    notificationDispatch({
      type: 'NOTIFY',
      payload: 'Success to log out',
      color: 'success',
    });
    setTimeout(() => {
      notificationDispatch({ type: 'MUTE' });
    }, 5000);
  };

  return (
    <div className="mx-7 sm:mx-20 my-5">
      <div className="flex justify-between">
        <Section titleSection={'Blogs'} />
        <ButtonClick onClick={handleLogout} type="red-button">
          Logout
        </ButtonClick>
      </div>

      <h2 className="text-lg my-2">
        <span className="font-bold">{user.name}</span> logged in
      </h2>

      <Togglable
        buttonLabelToOpen={'New blog'}
        buttonLabelToClose={'Close'}
        ref={blogAddRef}
        type={'green-button'}
      >
        <BlogForm blogAddRef={blogAddRef} blogs={blogs} setBlogs={setBlogs} />
      </Togglable>

      <div className="mt-5">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
        ))}
      </div>
    </div>
  );
};

Blogs.propTypes = {
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  blogAddRef: PropTypes.object.isRequired,
};

export default Blogs;
