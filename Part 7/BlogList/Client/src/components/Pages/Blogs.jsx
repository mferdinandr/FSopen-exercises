import Section from '../Elements/Section';
import ButtonClick from '../Elements/ButtonClick';
import Togglable from '../Elements/Togglable';
import Blog from '../Fragment/Blog';

import BlogForm from '../Fragment/BlogForm';
import blogService from '../../services/blogs';

import PropTypes from 'prop-types';
import { useNotifcationDispatch } from '../../NotificationContext';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Fragment/Header';

const Blogs = ({ blogAddRef }) => {
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

  const blogs = result.data.sort((a, b) => b.likes - a.likes);

  return (
    <div className="mx-7 sm:mx-20 my-5">
      <Header title={'Blogs'} />
      <Togglable
        buttonLabelToOpen={'New blog'}
        buttonLabelToClose={'Close'}
        ref={blogAddRef}
        type={'green-button'}
      >
        <BlogForm blogAddRef={blogAddRef} blogs={blogs} />
      </Togglable>

      <Link to={'/users'}>
        <ButtonClick type="blue-button">Show Users</ButtonClick>
      </Link>

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
