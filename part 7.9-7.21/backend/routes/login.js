const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'invalid username or password' });
    }

    // Log the found user for debugging purposes
    console.log('User found:', user);
    console.log('Password hash:', user.passwordHash);

    // Check if the password is correct
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
      return res.status(401).json({ error: 'invalid username or password' });
    }

    // Create a token for the user
    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' });

    // Send back the token and user details
    res.status(200).send({ token, username: user.username, name: user.name });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'something went wrong' });
  }
});

module.exports = router;
