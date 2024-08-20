import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs, handleLike, handleDelete, handleAddComment, currentUser }) => {
  // Create a copy of the blogs array and sort the copy
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
            {currentUser && currentUser.id && blog.user.id === currentUser.id && (
              <button onClick={() => handleDelete(blog.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      comments: PropTypes.array,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleAddComment: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string,
  }), // Make `id` optional
};

export default BlogList;
