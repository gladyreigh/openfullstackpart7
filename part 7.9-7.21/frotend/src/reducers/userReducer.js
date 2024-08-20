// src/reducers/userReducer.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null, // Initial state for user
  reducers: {
    loginUser(state, action) {
      return action.payload; // Update state with user data
    },
    logoutUser(state) {
      return null; // Clear user state on logout
    },
    // Add other user related actions if needed
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
