const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

router.get('/api/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

module.exports = router;
