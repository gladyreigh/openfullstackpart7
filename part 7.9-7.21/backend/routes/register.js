const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Adjust the path as necessary
const router = express.Router();

const saltRounds = 10;

router.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  const normalizedUsername = username.trim().toLowerCase();

  console.log('Received registration data:', { username, normalizedUsername });

  try {
    // Check if the user already exists with the normalized username
    const existingUser = await User.findOne({ username: normalizedUsername });
    console.log('Existing user found:', existingUser);

    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username: normalizedUsername,
      name,
      passwordHash: hashedPassword,
    });

    const savedUser = await user.save();
    console.log('User created successfully:', savedUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
