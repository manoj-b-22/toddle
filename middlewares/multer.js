const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.relative(__dirname, 'Toddle/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      return cb(new Error('A token is required for authentication'));
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN);
      req.user = decoded;
    } catch (err) {
      return cb(new Error('Invalid Token'));
    }
    if (req.user.role !== 'Tutor') {
      return cb(new Error('CUD permission is only for Tutor'));
    }
    cb(null, true);
  },
});
