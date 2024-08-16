
# Routed Anecdotes App Enhancements

This document outlines the steps taken to enhance the routed anecdotes application according to the exercises specified.

## Overview

We enhanced the routed anecdotes application to include routing with React Router, view individual anecdotes, and provide feedback after creating a new anecdote.

## Steps Completed

### 1. Added Routing with React Router

We introduced React Router to manage routing within the application. This allows us to navigate between different views:

- **Installation**: We added `react-router-dom` to manage routing.

  ```bash
  npm install react-router-dom
  ```

- **Modified App.jsx**: We updated the App component to use BrowserRouter, Route, and Link from react-router-dom to define routes and navigation.

  ```jsx
  import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';

  // Menu component with navigation links
  const Menu = () => {
    const padding = { paddingRight: 5 };
    return (
      <div>
        <Link to="/" style={padding}>anecdotes</Link>
        <Link to="/create" style={padding}>create new</Link>
        <Link to="/about" style={padding}>about</Link>
      </div>
    );
  };
  ```

### 2. Implemented View for Showing a Single Anecdote

We created a new route and component to display details of a single anecdote:

- **Created AnecdoteDetail Component**:

  ```jsx
  const AnecdoteDetail = ({ anecdotes }) => {
    const { id } = useParams();
    const anecdote = anecdotes.find(a => a.id === Number(id));

    if (!anecdote) return <p>Anecdote not found</p>;

    return (
      <div>
        <h2>{anecdote.content}</h2>
        <p>Author: {anecdote.author}</p>
        <p>Info: <a href={anecdote.info}>{anecdote.info}</a></p>
        <p>Votes: {anecdote.votes}</p>
      </div>
    );
  };
  ```

- **Updated Routing in App Component**:

  ```jsx
  <Routes>
    <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
    <Route path="/create" element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
    <Route path="/about" element={<About />} />
    <Route path="/anecdotes/:id" element={<AnecdoteDetail anecdotes={anecdotes} />} />
  </Routes>
  ```

### 3. Improved Functionality for Anecdote Creation

To provide feedback after creating an anecdote and transition automatically to the list view, we:

- **Updated CreateNew Component**:

  ```jsx
  const CreateNew = ({ addNew, setNotification }) => {
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [info, setInfo] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      addNew({ content, author, info, votes: 0 });
      setNotification('Anecdote created successfully!');
      setContent('');
      setAuthor('');
      setInfo('');
      setTimeout(() => setNotification(''), 5000); // Clear notification after 5 seconds
      navigate('/'); // Navigate to the list of anecdotes
    };

    return (
      <div>
        <h2>Create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>content <input name='content' value={content} onChange={(e) => setContent(e.target.value)} /></div>
          <div>author <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} /></div>
          <div>url for more info <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} /></div>
          <button type="submit">create</button>
        </form>
      </div>
    );
  };
  ```

- **Displayed Notification Globally**: Moved the notification state to the App component to ensure it's visible across different views.

  ```jsx
  const App = () => {
    const [anecdotes, setAnecdotes] = useState([
      { content: 'If it hurts, do it more often', author: 'Jez Humble', info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html', votes: 0, id: 1 },
      { content: 'Premature optimization is the root of all evil', author: 'Donald Knuth', info: 'http://wiki.c2.com/?PrematureOptimization', votes: 0, id: 2 }
    ]);
    const [notification, setNotification] = useState('');

    const addNew = (anecdote) => {
      anecdote.id = Math.round(Math.random() * 10000);
      setAnecdotes(anecdotes.concat(anecdote));
    };

    return (
      <Router>
        <div>
          <h1>Software anecdotes</h1>
          <Menu />
          <Routes>
            <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
            <Route path="/create" element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
            <Route path="/about" element={<About />} />
            <Route path="/anecdotes/:id" element={<AnecdoteDetail anecdotes={anecdotes} />} />
          </Routes>
          {notification && <div style={{ color: 'green', marginTop: '10px' }}>{notification}</div>}
          <Footer />
        </div>
      </Router>
    );
  };
  ```

## Conclusion

By integrating React Router and managing state effectively, we have created a more interactive and user-friendly anecdotes application. The addition of routing, detail views, and notifications enhances the overall user experience of the application.
