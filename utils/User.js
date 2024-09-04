// utils/jwt.js
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    'zabi1234', // Replace with your secret
    { expiresIn: '1h' }
  );
};

module.exports = generateToken;
