const jwt = require('jsonwebtoken');

const MOCK_ADMIN_ID = '60d5ec49a9b8b84b8c8e8b8b'; // Must match ID in adminController

const verifyAdminToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Use a mock secret if not available in env
      const secret = process.env.JWT_SECRET || 'a_very_strong_fallback_secret_for_development_env';

      // Verify token
      const decoded = jwt.verify(token, secret);

      // Check if the decoded ID matches our mock admin
      if(decoded.id === MOCK_ADMIN_ID) {
        req.user = { id: MOCK_ADMIN_ID, name: 'Admin User', email: 'admin@loveunsent.com' };
        next();
      } else {
        res.status(401).json({ message: 'Not authorized, invalid admin token' });
      }

    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { verifyAdminToken };
