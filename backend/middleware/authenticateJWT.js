// backend/middleware/authenticateJWT.js

const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'your_jwt_secret', (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'Access denied' });
    }
};

module.exports = authenticateJWT;
