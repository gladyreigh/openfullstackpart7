import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Blog form submitted with:', { title: newTitle, author: newAuthor, url: newUrl }); // Log form data for debugging
    await createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
            required
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
            required
          />
        </div>
        <div>
          URL
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
