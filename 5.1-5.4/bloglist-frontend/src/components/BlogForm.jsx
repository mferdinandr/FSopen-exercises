import { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuhtor] = useState('');
  const [url, setUrl] = useState('');

  const handleAddBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
