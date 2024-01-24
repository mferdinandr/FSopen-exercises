import { useState } from 'react';
import blogService from '../services/blogs';
import Notification from './Notification';
import Section from './Fragments/Section';
import Input from './Fragments/Input';
import ButtonForm from './Fragments/ButtonForm';

const BlogForm = ({
  blogs,
  setBlogs,
  blogAddRef,
  setMessage,
  setTypeMessage,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuhtor] = useState('');
  const [url, setUrl] = useState('');

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
    setTypeMessage('success');
    setTimeout(() => {
      setMessage(null);
    }, 5000);

    setTitle('');
    setAuhtor('');
    setUrl('');
  };

  return (
    <div>
      <Section titleSection={'Create New Blog'}>
        <form onSubmit={handleAddBlog} className="w-1/2 my-4">
          <Input
            type="text"
            value={title}
            name="Title"
            label="Title"
            onChange={({ target }) => setTitle(target.value)}
          ></Input>
          <Input
            type="text"
            value={author}
            name="Author"
            label="Author"
            onChange={({ target }) => setAuhtor(target.value)}
          ></Input>
          <Input
            type="text"
            value={url}
            name="URL"
            label="URL"
            onChange={({ target }) => setUrl(target.value)}
          ></Input>
          <ButtonForm>Create</ButtonForm>
        </form>
      </Section>
    </div>
  );
};

export default BlogForm;
