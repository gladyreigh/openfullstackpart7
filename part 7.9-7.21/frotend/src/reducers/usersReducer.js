import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const usersSlice = createSlice({
  name: 'users',
  initialState: [], // Ensure initial state is an empty array
  reducers: {
    setUsers(state, action) {
      return action.payload; // Return the payload (array of users)
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch(setUsers(users));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
};

export default usersSlice.reducer;
