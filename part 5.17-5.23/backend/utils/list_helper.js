const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  
  return blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current;
  });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  // Count the number of blogs for each author
  const authorBlogsCount = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  // Find the author with the most blogs
  const mostBlogsAuthor = Object.keys(authorBlogsCount).reduce((max, author) => {
    return authorBlogsCount[author] > authorBlogsCount[max] ? author : max;
  });

  return {
    author: mostBlogsAuthor,
    blogs: authorBlogsCount[mostBlogsAuthor]
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  // Count the total likes for each author
  const authorLikesCount = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  // Find the author with the most likes
  const mostLikesAuthor = Object.keys(authorLikesCount).reduce((max, author) => {
    return authorLikesCount[author] > authorLikesCount[max] ? author : max;
  });

  return {
    author: mostLikesAuthor,
    likes: authorLikesCount[mostLikesAuthor]
  };
};

module.exports = {
  dummy: () => 1,
  totalLikes: (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0),
  favoriteBlog,
  mostBlogs,
  mostLikes
};
