import Section from '../Elements/Section';
import blogService from '../../services/blogs';
import loginService from '../../services/login';
import Input from '../Elements/Input';
import { useState } from 'react';
import ButtonForm from '../Elements/ButtonForm';

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

    setMessage(`a new blog ${title}, by ${author} added`);
    setTypeMessage('success');
    setTimeout(() => {
      setMessage(null);
    }, 3000);

    setTitle('');
    setAuhtor('');
    setUrl('');
  };

  return (
    <div className="mt-4">
      <Section titleSection={'Create New Blog'}>
        <form onSubmit={handleAddBlog} className="w-full my-2">
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
