import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import store from './store';  // Import the Redux store

// Wrap the App component with the Provider and pass in the store
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
