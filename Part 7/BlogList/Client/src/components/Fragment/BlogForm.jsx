import Section from '../Elements/Section';
import blogService from '../../services/blogs';
import Input from '../Elements/Input';
import { useState } from 'react';
import ButtonForm from '../Elements/ButtonForm';
import PropTypes from 'prop-types';

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
            id={'#title'}
            value={title}
            name="Title"
            label="Title"
            onChange={({ target }) => setTitle(target.value)}
          ></Input>
          <Input
            type="text"
            id={'#author'}
            value={author}
            name="Author"
            label="Author"
            onChange={({ target }) => setAuhtor(target.value)}
          ></Input>
          <Input
            type="text"
            id={'#url'}
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

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogAddRef: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
  setTypeMessage: PropTypes.func.isRequired,
};

export default BlogForm;
