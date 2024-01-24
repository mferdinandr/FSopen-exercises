import { useState } from 'react';
import blogService from '../services/blogs';
import Notification from './Notification';
import Section from './Fragments/Section';

const CreateBlogForm = ({ blogs, setBlogs, blogAddRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuhtor] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState(null);

  const handleAddBlog = (event) => {
    event.preventDefault();
    blogAddRef.current();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
    setMessage(`a new bllog ${title}, by ${author} added`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);

    setTitle('');
    setAuhtor('');
    setUrl('');
  };

  return (
    <div>
      <Notification message={message} type={'success'}></Notification>
      <Section titleSection={'Craate Bew Blog'}>
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
          <button type="submit">create</button>
        </form>
      </Section>
    </div>
  );
};

export default CreateBlogForm;
