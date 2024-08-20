// src/components/BlogForm.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('calls event handler with correct details when a new blog is created', () => {
  const mockCreateBlog = jest.fn();
  render(<BlogForm createBlog={mockCreateBlog} />);

  // Fill in the form fields
  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Blog Title' } });
  fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Test Author' } });
  fireEvent.change(screen.getByLabelText(/url/i), { target: { value: 'http://testurl.com' } });

  // Submit the form
  fireEvent.click(screen.getByText('Create'));

  // Check that the mock function was called with the correct details
  expect(mockCreateBlog).toHaveBeenCalledWith({
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
  });
});
