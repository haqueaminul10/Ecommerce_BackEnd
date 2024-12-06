const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const requireLogin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: 'Authorization token is missing',
    });
  }
  const token = authHeader;
  console.log(`📌 ~ authMiddleware ~ token:`, token);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({
        message: 'Invalid token',
      });
    }
    req.user = user;
    next();
  });
};

module.exports = { requireLogin };
