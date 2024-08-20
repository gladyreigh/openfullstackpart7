import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access the current user
import blogService from '../services/blogs';
import CommentForm from './CommentForm';
import './BlogView.css';

const BlogView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false); // Track if the blog is liked
  const user = useSelector((state) => state.user); // Get the current user from Redux store

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogService.getById(id);
        setBlog(fetchedBlog);
        setLiked(fetchedBlog.likes > 0); // Update liked status based on blog's likes
        setLoading(false);
      } catch (error) {
        setError('Error fetching blog. Please try again later.');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    try {
      if (liked) {
        await blogService.unlike(id);
        setLiked(false);
      } else {
        await blogService.like(id);
        setLiked(true);
      }
      const updatedBlog = await blogService.getById(id);
      setBlog(updatedBlog);
    } catch (error) {
      setError('Error liking/unliking blog. Please try again later.');
    }
  };

  const handleAddComment = async (comment) => {
    try {
      const updatedBlog = await blogService.addComment(id, comment);
      setBlog(updatedBlog);
    } catch (error) {
      setError('Error adding comment. Please try again later.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the blog "${blog.title}"?`)) {
      try {
        await blogService.remove(id);
        navigate('/blogs'); // Navigate back to the blog list after deletion
      } catch (error) {
        setError('Error deleting blog. Please try again later.');
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div>
      <h2 className="blog-titles-header">{blog.title}</h2>
      <p><strong>Author:</strong> {blog.author}</p>
      <p><strong>URL:</strong> <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
      <p><strong>Likes:</strong> {blog.likes} 
        <button onClick={handleLike}>
          {liked ? 'Unlike' : 'Like'}
        </button>
      </p>

      <h3>Comments</h3>
      <ul>
        {blog.comments && blog.comments.length > 0 ? (
          blog.comments.map((comment, index) => (
            <li key={index}>{comment.content}</li>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </ul>

      <CommentForm handleAddComment={handleAddComment} />

      {user && user.username === blog.user.username && (
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      )}

      <button className="back-button" onClick={() => navigate('/blogs')}>Back</button>
    </div>
  );
};

export default BlogView;
