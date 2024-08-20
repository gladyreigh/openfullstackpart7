import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';

const Blog = ({ blog, handleLike, handleDelete, handleAddComment, user, blogs }) => {
  const [commentsVisible, setCommentsVisible] = useState(false);

  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  return (
    <div className="blog">
      <div>
        {blog.title} by {blog.author}
      </div>
      <div>
        Likes: {blog.likes ?? 0}
        <button onClick={() => handleLike(blog)}>Like</button>
        {user && user.id === blog.user?.id && (
          <button onClick={() => handleDelete(blog)}>Delete</button>
        )}
      </div>
      <div>
        <button onClick={toggleComments}>
          {commentsVisible ? 'Hide Comments' : 'Show Comments'}
        </button>
        {commentsVisible && (
          <div>
            <h4>Comments</h4>
            {blog.comments && blog.comments.length > 0 ? (
              <ul>
                {blog.comments.map((comment, index) => (
                  <li key={index}>{comment.content}</li>
                ))}
              </ul>
            ) : (
              <p>No comments yet</p>
            )}
            <CommentForm handleAddComment={handleAddComment} />
          </div>
        )}
      </div>
      {user && (
        <div className="blog-navigation">
          <h4>Blog Titles</h4>
          <ul>
            {blogs.map((b) => (
              <li key={b.id}>
                <Link to={`/blogs/${b.id}`}>{b.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number,  // Likes are now optional
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
      })
    ),
    user: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleAddComment: PropTypes.func.isRequired,
  user: PropTypes.object, // Pass user object for conditional rendering
  blogs: PropTypes.array.isRequired, // Pass blogs array for navigation
};

export default Blog;
