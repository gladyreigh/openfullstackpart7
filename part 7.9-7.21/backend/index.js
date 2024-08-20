const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRouter = require('./routes/blogs');
const userRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const middleware = require('./utils/middleware'); // Ensure the path is correct
require('dotenv').config();

const app = express();
const mongoUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/bloglist'; // Use environment variable or default

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
