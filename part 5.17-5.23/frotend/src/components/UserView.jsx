// src/components/UserView.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';
import blogService from '../services/blogs';
import Blog from './Blog';

const UserView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.user); // Get the current user from Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await dispatch(initializeUsers());
        setLoading(false);
      } catch (error) {
        setError('Error fetching user data. Please try again later.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const user = users.find((u) => u.id === id);

  useEffect(() => {
    if (user) {
      setUserBlogs(user.blogs); // Initialize blogs from user data
    }
  }, [user]);

  const handleLike = async (blogId) => {
    try {
      const blog = userBlogs.find((b) => b.id === blogId);
      if (!blog) return;

      if (blog.likes.includes(currentUser.id)) {
        await blogService.unlike(blogId);
      } else {
        await blogService.like(blogId);
      }
      const updatedBlog = await blogService.getById(blogId);
      setUserBlogs((blogs) =>
        blogs.map((b) => (b.id === blogId ? updatedBlog : b))
      );
    } catch (error) {
      setError('Error liking/unliking blog. Please try again later.');
    }
  };

  const handleAddComment = async (blogId, comment) => {
    try {
      const updatedBlog = await blogService.addComment(blogId, comment);
      setUserBlogs((blogs) =>
        blogs.map((b) => (b.id === blogId ? updatedBlog : b))
      );
    } catch (error) {
      setError('Error adding comment. Please try again later.');
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.remove(blogId);
        setUserBlogs((blogs) => blogs.filter((b) => b.id !== blogId));
      } catch (error) {
        setError('Error deleting blog. Please try again later.');
      }
    }
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Blogs created:</h3>
      {userBlogs.length === 0 ? (
        <p>No blogs created</p>
      ) : (
        <ul>
          {userBlogs.map((blog) => (
            <li key={blog.id}>
              <Blog
                blog={blog}
                handleLike={handleLike}
                handleDelete={handleDelete}
                handleAddComment={handleAddComment}
                user={currentUser}
                blogs={userBlogs}
              />
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/blogs')}>Back to Blog List</button>
    </div>
  );
};

export default UserView;
