
# Blog List Application

This is a blog list application built as part of the Full Stack Open course. The application allows users to view, create, like, and delete blog posts. Users can also register and log in to interact with the blog posts.

## Features

- **User Authentication**: Users can register, log in, and log out.
- **Blog Management**: Users can create, view, like, and delete blog posts.
- **Notifications**: Feedback is provided for user actions.
- **Sorting**: Blogs are sorted by the number of likes.
- **Responsive Design**: The application is designed to be responsive.

## Setup

To run this application locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd bloglist/frontend
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Start the Development Server**

   ```bash
   npm start
   ```

5. **Open the Application**

   Visit http://localhost:3000 in your browser.

## Configuration

### ESLint

This project uses ESLint for linting. The configuration is located in the `.eslintrc.cjs` file.

**Configuration:**

```js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off'
  },
};
```

To run ESLint and fix issues:

```bash
npx eslint . --fix
```

### PropTypes

PropTypes are used to validate the props passed to React components. The following components use PropTypes:

- **Blog Component**
- **BlogForm Component**
- **LoginForm Component**
- **RegisterForm Component**

## Project Structure

- `src/components/`: Contains all the React components.
- `src/services/`: Contains service files for interacting with APIs.
- `src/App.jsx`: The main application component.
- `src/index.js`: The entry point for the React application.

## Exercises Completed

- **5.5**: Created a form for adding new blog posts with toggling visibility.
- **5.6**: Moved blog creation form to a separate component.
- **5.7**: Added a toggle button to show/hide blog details.
- **5.8**: Implemented the like button functionality.
- **5.9**: Fixed issue with missing user name after liking a blog.
- **5.10**: Sorted blog posts by the number of likes.
- **5.11**: Added functionality to delete blog posts.
- **5.12**: Configured PropTypes and ESLint for the project.
