// src/reducers/index.js

import { combineReducers } from 'redux';
import blogReducer from './blogReducer'; // Import the blogReducer
import userReducer from './userReducer'; // Ensure this file exists
import notificationReducer from './notificationReducer'; // Ensure this file exists

const rootReducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  notification: notificationReducer,
});

export default rootReducer;
