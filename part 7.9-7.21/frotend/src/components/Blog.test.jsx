// src/components/Blog.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('like button calls event handler twice when clicked twice', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: { name: 'Test User', username: 'testuser' },
  };

  const mockHandler = jest.fn();
  render(<Blog blog={blog} handleLike={mockHandler} user={{ username: 'testuser' }} />);

  // Click the like button twice
  const likeButton = screen.getByText('Like');
  likeButton.click();
  likeButton.click();

  // Ensure the event handler was called twice
  expect(mockHandler).toHaveBeenCalledTimes(2);
});
