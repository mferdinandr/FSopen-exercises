var _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const mostLikedBlog = blogs.reduce((mostLiked, cur) => {
    return mostLiked.likes > cur.likes ? mostLiked : cur;
  });
  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const blogsCount = _.countBy(blogs, (blog) => blog.author);
  const blogsCountEntries = Object.entries(blogsCount);
  const maxBlogsAuthor = blogsCountEntries.reduce((acc, array) =>
    array[1] > acc[1] ? array : acc
  );
  const res = {
    author: maxBlogsAuthor[0],
    blogs: maxBlogsAuthor[1],
  };
  return res;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
