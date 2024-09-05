const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  // Check if the Authorization header exists
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Extract the token
  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch the user by ID from the decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token or user does not exist' });
    }

    // Attach user to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Handle any errors with token verification
    console.error('Token verification error:', err.message); // Log error for debugging
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
