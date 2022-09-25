const jwt = require('jsonwebtoken');

require('dotenv').config();

const generateToken = (id, username, password, role) => {
  const token = jwt.sign({ id, username, password, role }, process.env.TOKEN);
  return token;
};

const verifyToken = (req, res, nxt) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res
      .status(403)
      .json({ message: 'A token is required for authentication' });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN);
    res.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
  nxt();
};

module.exports = { generateToken, verifyToken };
