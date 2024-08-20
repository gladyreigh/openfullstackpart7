const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/user');
const router = express.Router();

// POST /api/users - Create a new user
router.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  if (!username || username.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters long' });
  }

  if (!password || password.length < 3) {
    return res.status(400).json({ error: 'Password must be at least 3 characters long' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'Username must be unique' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
