import Togglable from '../Elements/Togglable';
import { AiFillLike } from 'react-icons/ai';
import blogService from '../../services/blogs';
import ButtonClick from '../Elements/ButtonClick';
import PropTypes from 'prop-types';
import { useNotifcationDispatch } from '../../NotificationContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Blog = ({ blog }) => {
  const notificationDispatch = useNotifcationDispatch();
  const queryClient = useQueryClient();

  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [''] });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [''] });
      notificationDispatch({
        type: 'NOTIFY',
        payload: `${blog.title}, by ${blog.author} removed`,
        color: 'success',
      });
      setTimeout(() => {
        notificationDispatch({ type: 'MUTE' });
      }, 5000);
    },
    onError: () => {
      notificationDispatch({
        type: 'NOTIFY',
        payload: 'Only who created this blog can deleted',
        color: 'error',
      });
      setTimeout(() => {
        notificationDispatch({ type: 'MUTE' });
      }, 5000);
    },
  });

  const handleAddLike = () => {
    updateBlogMutation.mutate(blog.id);
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  return (
    <div className="border border-black my-2 px-3 py-2 rounded-lg">
      <p className="font-bold blogTitle">
        {blog.title}, by {blog.author}
      </p>
      <Togglable
        buttonLabelToOpen="View"
        buttonLabelToClose="Hide"
        type={'blue-button'}
      >
        <div className="blogAll">
          <div>
            <a href={blog.url}> {blog.url}</a>
          </div>
          <div className="flex items-center py-1" onClick={handleAddLike}>
            <p>Likes : {blog.likes}</p>
            <AiFillLike
              className="text-red-500  ml-10 hover:cursor-pointer active:scale-125 active:text-red-600 likeButton"
              data-testid="likeButton"
              size={25}
            />
          </div>
          <div>Author : {blog.author}</div>
          <ButtonClick type={'red-button'} onClick={handleDelete}>
            Delete
          </ButtonClick>
        </div>
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // setBlogs: PropTypes.func.isRequired,
};

export default Blog;
