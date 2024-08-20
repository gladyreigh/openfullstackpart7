
# Blog List Application

A full-stack application for managing blogs, including features for user authentication, blog creation, deletion, and updates.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Setup](#setup)
5. [API Endpoints](#api-endpoints)
6. [Testing](#testing)
7. [Development Walkthrough](#development-walkthrough)
8. [Contributing](#contributing)
9. [License](#license)

## Introduction

This project is a blog management application that allows users to create, update, delete, and view blogs. It includes user authentication to ensure that only authorized users can make changes to their own blogs.

## Features

- User authentication using JWT tokens
- Create, update, and delete blogs
- List all blogs with user details
- Token-based access control for CRUD operations

## Technologies

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Supertest for API testing
- bcrypt for password hashing

## Setup

To set up and run this application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/your-repository.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd your-repository
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory with the following content:
   ```
   SECRET=your_jwt_secret
   ```

5. **Start the MongoDB server:**
   Ensure MongoDB is running on your local machine.

6. **Start the application:**
   ```bash
   npm start
   ```

## API Endpoints

### Users
- **POST /api/users**
  - Create a new user
  - Requires `username`, `name`, and `password` in the request body

### Blogs
- **GET /api/blogs**
  - List all blogs

- **POST /api/blogs**
  - Create a new blog
  - Requires `title`, `author`, `url`, and an optional `likes` field in the request body
  - Must include a valid JWT token in the Authorization header

- **PUT /api/blogs/:id**
  - Update a blog by ID
  - Requires `title`, `author`, `url`, and `likes` in the request body
  - Must include a valid JWT token in the Authorization header

- **DELETE /api/blogs/:id**
  - Delete a blog by ID
  - Must include a valid JWT token in the Authorization header

### Authentication
- **POST /api/login**
  - Login and receive a JWT token
  - Requires `username` and `password` in the request body

## Testing

To run the tests, use the following command:
```bash
npm test
```
Ensure that your MongoDB server is running, and the test database is properly set up before running the tests.

## Development Walkthrough

### Exercise 4.15 - Blog List Expansion, step 1
- **Task:** Added `likes` property to blog schema.
- **Implementation:** Modified the Blog schema to include a `likes` field with a default value of 0.

### Exercise 4.16 - Blog List Expansion, step 2
- **Task:** Added a route for liking a blog.
- **Implementation:** Implemented the PUT /api/blogs/:id endpoint to update the `likes` field of a blog by its ID.

### Exercise 4.17 - Blog List Expansion, step 3
- **Task:** Added a route for creating new users.
- **Implementation:** Created the POST /api/users endpoint to register new users with hashed passwords.

### Exercise 4.18 - Blog List Expansion, step 4
- **Task:** Implemented token-based authentication for creating and deleting blogs.
- **Implementation:** Added JWT-based authentication to protect the POST /api/blogs and DELETE /api/blogs/:id routes.

### Exercise 4.19 - Blog List Expansion, step 5
- **Task:** Created a login endpoint to issue tokens.
- **Implementation:** Implemented the POST /api/login endpoint to authenticate users and issue JWT tokens.

### Exercise 4.20 - Blog List Expansion, step 6
- **Task:** Created tokenExtractor middleware to extract tokens from requests.
- **Implementation:** Added tokenExtractor middleware to extract JWT tokens from the Authorization header.

### Exercise 4.21 - Blog List Expansion, step 9
- **Task:** Restrict blog deletion to the user who created the blog.
- **Implementation:** Modified the DELETE /api/blogs/:id route to ensure only the blog's creator can delete it.

### Exercise 4.22 - Blog List Expansion, step 10
- **Task:** Added userExtractor middleware to identify the user from the token.
- **Implementation:** Implemented userExtractor middleware to decode the token and attach the user information to the request.

### Exercise 4.23 - Blog List Expansion, step 11
- **Task:** Updated tests to handle token-based authentication.
- **Implementation:** Modified tests to include tokens for authenticated requests and added a test to ensure unauthorized requests are properly handled.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. Ensure that your code follows the project's coding standards and passes all tests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
