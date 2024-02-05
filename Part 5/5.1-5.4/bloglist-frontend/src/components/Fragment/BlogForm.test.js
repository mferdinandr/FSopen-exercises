// SKIP 5.16

// import { render } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
// import BlogForm from './BlogForm';

// const blog = [
//   {
//     title: 'Component testing is done with react-testing-library',
//     author: 'Robert C. Martin',
//     url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
//     likes: 10,
//   },
// ];

// const setBlogs = jest.fn();
// const blogAddRef = {};
// const setMessage = jest.fn();
// const setTypeMessage = jest.fn();

// test('create a new blog', () => {
//   const mockHandler = jest.fn();

//   const component = render(
//     <BlogForm
//       addBlog={mockHandler}
//       blogs={blog}
//       setBlogs={setBlogs}
//       blogAddRef={blogAddRef}
//       setMessage={setMessage}
//       setTypeMessage={setTypeMessage}
//     />
//   );

//   const form = component.container.querySelector('form');
//   expect(form).toBeDefined();
//   expect(form).toBeVisible();

//   const title = component.container.querySelector('#title');
//   expect(title).toBeDefined();
//   expect(title).toBeVisible();
//   userEvent.type(title, 'test title');

//   const author = component.container.querySelector('#author');
//   expect(author).toBeDefined();
//   expect(author).toBeVisible();
//   userEvent.type(author, 'test author');

//   const url = component.container.querySelector('#url');
//   expect(url).toBeDefined();
//   expect(url).toBeVisible();
//   userEvent.type(url, 'test url');

//   const button = component.getByText('create');
//   userEvent.click(button);

//   expect(mockHandler.mock.calls).toHaveLength(1);
//   expect(mockHandler.mock.calls[0][0].title).toBe('test title');
//   expect(mockHandler.mock.calls[0][0].author).toBe('test author');
//   expect(mockHandler.mock.calls[0][0].url).toBe('test url');
// });
