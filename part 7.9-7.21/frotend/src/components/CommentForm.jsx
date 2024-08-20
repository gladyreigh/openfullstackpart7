// src/components/CommentForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CommentForm = ({ handleAddComment }) => {
  const [comment, setComment] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting comment:', comment); // Debug log
    if (comment.trim()) {
      handleAddComment(comment.trim());
      setComment(''); // Clear the input after submission
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

CommentForm.propTypes = {
  handleAddComment: PropTypes.func.isRequired,
};

export default CommentForm;
