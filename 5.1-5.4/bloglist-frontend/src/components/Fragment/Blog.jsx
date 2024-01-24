import Togglable from '../Elements/Togglable';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

const Blog = ({ blog }) => {
  return (
    <div className="border border-black my-2 px-3 py-2 rounded-lg">
      <p className="font-bold">{blog.title}</p>
      <Togglable buttonLabelToOpen="view" buttonLabelToClose="Hide">
        <div>
          <div>
            <a href={blog.url}> {blog.url}</a>
          </div>
          <div className="flex items-center ">
            <p>Likes : {blog.likes}</p>
            <AiFillLike
              className="text-red-500  ml-10 hover:cursor-pointer hover:scale-125 hover:text-red-600"
              size={25}
            />
          </div>
          <div>Author : {blog.author}</div>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
