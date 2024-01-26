import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blog from './Blog';

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10,
};

const setBlogs = jest.fn();
const setMessage = jest.fn();
const setTypeMessage = jest.fn();

test('default blog view, shows only title and author', () => {
  const component = render(
    <Blog
      blog={blog}
      setBlogs={setBlogs}
      setMessage={setMessage}
      setTypeMessage={setTypeMessage}
    ></Blog>
  );

  const blogTitle = component.container.querySelector('.blogTitle');
  expect(blogTitle).toBeDefined();
  expect(blogTitle).toBeVisible();

  expect(blogTitle).toHaveTextContent(`${blog.title}, by ${blog.author}`);
});
