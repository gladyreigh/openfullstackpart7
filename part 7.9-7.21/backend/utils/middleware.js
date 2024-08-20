const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming you have a User model

// Middleware to extract token from the request headers
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7); // Extract token
  } else {
    req.token = null;
  }
  next();
};

// Middleware to extract user from token
const userExtractor = async (req, res, next) => {
  if (req.token) {
    try {
      // Ensure SECRET environment variable is set
      if (!process.env.SECRET) {
        throw new Error('SECRET environment variable is not set');
      }

      // Verify the token and attach the user to the request
      const decodedToken = jwt.verify(req.token, process.env.SECRET);

      // Fetch the user from the database based on decoded token's id
      req.user = await User.findById(decodedToken.id);

      // If no user is found, return an error
      if (!req.user) {
        return res.status(401).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Token verification failed:', error.message); // Log the error for debugging
      return res.status(401).json({ error: 'Token invalid or expired' });
    }
  } else {
    req.user = null;
  }
  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
