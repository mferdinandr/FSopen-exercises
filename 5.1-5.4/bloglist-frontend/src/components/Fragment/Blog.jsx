import Togglable from '../Elements/Togglable';
import { AiFillLike } from 'react-icons/ai';
import blogService from '../../services/blogs';
import { useEffect, useState } from 'react';

const Blog = ({ blog, setBlogs }) => {
  const handleAddLike = () => {
    blogService.update(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    });

    blogService.getById(blog.id).then((data) => {
      console.log('data', data, blog);
      setBlogs((prev) =>
        prev.map((blog) => (blog.id === data.id ? data : blog))
      );
    });
  };

  return (
    <div className="border border-black my-2 px-3 py-2 rounded-lg">
      <p className="font-bold">{blog.title}</p>
      <Togglable
        buttonLabelToOpen="View"
        buttonLabelToClose="Hide"
        type={'blue-button'}
      >
        <div>
          <div>
            <a href={blog.url}> {blog.url}</a>
          </div>
          <div className="flex items-center py-1">
            <p>Likes : {blog.likes}</p>
            <AiFillLike
              className="text-red-500  ml-10 hover:cursor-pointer active:scale-125 active:text-red-600"
              size={25}
              onClick={handleAddLike}
            />
          </div>
          <div>Author : {blog.author}</div>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
