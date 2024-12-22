const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, msg: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.secret);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ success: false, msg: 'Unauthorized: Invalid token' });
  }
};