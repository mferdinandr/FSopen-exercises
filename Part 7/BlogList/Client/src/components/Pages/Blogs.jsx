import Section from '../Elements/Section';
import ButtonClick from '../Elements/ButtonClick';
import Togglable from '../Elements/Togglable';
import Blog from '../Fragment/Blog';

import BlogForm from '../Fragment/BlogForm';
import blogService from '../../services/blogs';

import PropTypes from 'prop-types';
import { useNotifcationDispatch } from '../../NotificationContext';
import { useQuery } from '@tanstack/react-query';

const Blogs = ({ setUser, user, blogAddRef }) => {
  const notificationDispatch = useNotifcationDispatch();

  const result = useQuery({
    queryKey: [''],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>Wait a few minutes...</div>;
  }

  if (result.isError) {
    return <div>Error to get data</div>;
  }

  const blogs = result.data;

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser({ type: 'REMOVE' });
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
        <BlogForm blogAddRef={blogAddRef} blogs={blogs} />
      </Togglable>

      <div className="mt-5">
        {blogs && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
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
