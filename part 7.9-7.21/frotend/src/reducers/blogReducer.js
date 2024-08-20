// src/reducers/blogReducer.js
import { createSlice } from '@reduxjs/toolkit';

// Create the blog slice
const blogSlice = createSlice({
  name: 'blogs',
  initialState: [], // Default initial state
  reducers: {
    initializeBlogs(state, action) {
      console.log('initializeBlogs reducer action:', action); // Log action to inspect payload
      return action.payload || []; // Ensure we return an empty array if payload is undefined
    },
    likeBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? { ...blog, likes: action.payload.likes } : blog
      );
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    createNewBlog(state, action) {
      return [...state, action.payload];
    },
    addComment(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, comments: action.payload.comments }
          : blog
      );
    },
  },
});

// Export actions
export const { initializeBlogs, likeBlog, deleteBlog, createNewBlog, addComment } = blogSlice.actions;

// Export reducer
export default blogSlice.reducer;
