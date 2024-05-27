const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Change to 'bcryptjs' if you installed bcryptjs
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User registration
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role
        });
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send(error);
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
            res.json({ token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
