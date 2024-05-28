const express = require('express');
const bcrypt = require('bcryptjs'); // Update to bcryptjs
const jwt = require('jsonwebtoken');
const { User } = require('../models/User'); // Adjust the path to your models as necessary

const router = express.Router();

// Login route
router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret');
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Register route
router.post('/register', async (req, res) => {
  console.log('Register route hit');
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Please provide username, password, and role' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const newUser = await User.create({ username, password: hashedPassword, role });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: 'Registration failed' });
  }
});

module.exports = router;