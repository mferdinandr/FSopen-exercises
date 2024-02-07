import Togglable from '../Elements/Togglable';
import { AiFillLike } from 'react-icons/ai';
import blogService from '../../services/blogs';
import ButtonClick from '../Elements/ButtonClick';
import PropTypes from 'prop-types';
import { useNotifcationDispatch } from '../../NotificationContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import Header from './Header';

export const BlogDetail = ({ users }) => {
  const match = useMatch('/blogs/:id');
  const notificationDispatch = useNotifcationDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [''] });
    },
  });

  if (!users) {
    return null;
  } else {
    const findUser =
      users && users.filter((blog) => blog.id === match.params.id);

    const deleteBlogMutation = useMutation({
      mutationFn: blogService.remove,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [''] });
        notificationDispatch({
          type: 'NOTIFY',
          payload: `${findUser[0].title}, by ${findUser[0].author} removed`,
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
      updateBlogMutation.mutate(findUser[0].id);
    };

    const handleDelete = async () => {
      if (
        window.confirm(
          `Remove blog ${findUser[0].title} by ${findUser[0].author}`
        )
      ) {
        deleteBlogMutation.mutate(findUser[0].id);
        navigate('/blogs');
      }
    };

    return (
      <div className="mx-7 sm:mx-20 my-5">
        <Header title={'Blog Detail'} />
        <div>
          <div>
            <h1 className="font-bold text-xl py-3">{findUser[0].title}</h1>
            <div className="pl-2">
              <div>
                <a href={findUser[0].url}> {findUser[0].url}</a>
              </div>
              <div className="flex items-center py-2">
                <p>Likes : {findUser[0].likes}</p>
                <AiFillLike
                  className="text-red-500  ml-10 hover:cursor-pointer active:scale-125 active:text-red-600 likeButton"
                  data-testid="likeButton"
                  size={25}
                  onClick={handleAddLike}
                />
              </div>
              <div>Author : {findUser[0].author}</div>
              <ButtonClick type={'red-button'} onClick={handleDelete}>
                Delete
              </ButtonClick>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const Blog = ({ blog }) => {
  return (
    <div className="border border-black my-2 px-3 py-2 rounded-lg">
      <Link to={`/blogs/${blog.id}`} className="font-bold blogTitle">
        {blog.title}, by {blog.author}
      </Link>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
