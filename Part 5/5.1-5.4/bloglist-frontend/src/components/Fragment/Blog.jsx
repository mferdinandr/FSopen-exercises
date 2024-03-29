import Togglable from '../Elements/Togglable';
import { AiFillLike } from 'react-icons/ai';
import blogService from '../../services/blogs';
import ButtonClick from '../Elements/ButtonClick';
import PropTypes from 'prop-types';

const Blog = ({ blog, setBlogs, setMessage, setTypeMessage }) => {
  const handleAddLike = async () => {
    blogService.update(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    });

    await blogService.getById(blog.id).then((data) => {
      setBlogs((prev) =>
        prev.map((blog) => (blog.id === data.id ? data : blog))
      );
    });
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id);

        let blogs = await blogService.getAll();
        blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(blogs);

        setMessage(`${blog.title}, by ${blog.author} removed`);
        setTypeMessage('success');
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } catch {
        setMessage('Only who created this blog can deleted');
        setTypeMessage('error');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
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
  setBlogs: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setTypeMessage: PropTypes.func.isRequired,
};

export default Blog;
