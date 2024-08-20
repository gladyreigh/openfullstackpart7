import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BlogList from './components/BlogList'; // Import BlogList
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import UsersView from './components/UsersView';
import UserView from './components/UserView';
import BlogView from './components/BlogView';
import { initializeBlogs } from './reducers/blogReducer';
import { loginUser, logoutUser } from './reducers/userReducer';
import { setNotification } from './reducers/notificationReducer';
import blogService from './services/blogs';
import registerService from './services/register';
import './App.css';

const App = () => {
  const [showRegister, setShowRegister] = useState(false);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        dispatch(initializeBlogs(blogs));
      } catch (exception) {
        console.error('Error fetching blogs:', exception);
      }
    };

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      if (user?.token) {
        blogService.setToken(user.token);
        dispatch(loginUser(user));
        fetchBlogs();
      } else {
        console.error('No token found in local storage. Logging out.');
        handleLogout();
      }
    }
  }, [dispatch]);

  const handleRegister = async ({ username, name, password }) => {
    try {
      await registerService.register({ username, name, password });
      await handleLogin(username, password);
    } catch (exception) {
      dispatch(setNotification({ text: exception.response?.data?.error || 'Registration failed', type: 'error' }, 5));
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const user = await blogService.login({ username, password });
      if (user && user.token) {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
        blogService.setToken(user.token);
        dispatch(loginUser(user));
        dispatch(initializeBlogs(await blogService.getAll()));
        dispatch(setNotification({ text: `Welcome ${user.name}`, type: 'success' }, 5));
      } else {
        throw new Error('Token is missing in the response');
      }
    } catch (exception) {
      dispatch(setNotification({ text: 'Invalid username or password', type: 'error' }, 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    blogService.setToken(null);
    dispatch(logoutUser());
    dispatch(setNotification({ text: 'Successfully logged out', type: 'success' }, 5));
  };

  const createBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject);
      dispatch(initializeBlogs(await blogService.getAll()));
      dispatch(setNotification({ text: `A new blog "${blogObject.title}" by ${blogObject.author} added`, type: 'success' }, 5));
    } catch (exception) {
      dispatch(setNotification({ text: 'Error adding blog', type: 'error' }, 5));
      if (exception.message.includes('No token found')) {
        handleLogout();
      }
    }
  };

  const handleLike = async (blog) => {
    try {
      await blogService.like(blog.id);
      dispatch(initializeBlogs(await blogService.getAll()));
      dispatch(setNotification({ text: 'Blog liked', type: 'success' }, 5));
    } catch (exception) {
      const errorMessage = exception.response?.data?.error || 'Error liking blog';
      dispatch(setNotification({ text: errorMessage, type: 'error' }, 5));
    }
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id);
        dispatch(initializeBlogs(await blogService.getAll()));
        dispatch(setNotification({ text: 'Blog removed successfully', type: 'success' }, 5));
      } catch (exception) {
        dispatch(setNotification({ text: 'Error removing blog', type: 'error' }, 5));
      }
    }
  };

  const handleAddComment = async (blogId, comment) => {
    try {
      await blogService.addComment(blogId, comment);
      dispatch(initializeBlogs(await blogService.getAll()));
      dispatch(setNotification({ text: 'Comment added successfully', type: 'success' }, 5));
    } catch (exception) {
      dispatch(setNotification({ text: 'Error adding comment', type: 'error' }, 5));
    }
  };

  return (
    <Router>
      <div>
        <Notification message={notification} />
        <nav>
          <Link to="/">Home</Link> | <Link to="/users">Users</Link> | <Link to="/blogs">Blogs</Link>
          {user && <button onClick={handleLogout}>Logout</button>}
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              user === null ? (
                <div>
                  {showRegister ? (
                    <RegisterForm handleRegister={handleRegister} handleBack={() => setShowRegister(false)} />
                  ) : (
                    <div>
                      <LoginForm handleLogin={handleLogin} clearFields={showRegister} />
                      <button onClick={() => setShowRegister(true)}>Register</button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h2>Blogs</h2>
                  <Togglable buttonLabel="Create new blog">
                    <BlogForm createBlog={createBlog} />
                  </Togglable>
                  <BlogList
                    blogs={blogs}
                    handleLike={handleLike}
                    handleDelete={handleDelete}
                    handleAddComment={handleAddComment}
                    currentUser={user}
                  />
                </div>
              )
            }
          />
          <Route path="/users" element={<UsersView />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route
            path="/blogs"
            element={
              <div>
                <h2>Blogs</h2>
                <BlogList
                  blogs={blogs}
                  handleLike={handleLike}
                  handleDelete={handleDelete}
                  handleAddComment={handleAddComment}
                  currentUser={user}
                />
              </div>
            }
          />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
