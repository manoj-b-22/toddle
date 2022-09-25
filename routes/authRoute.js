const { Router } = require('express');
const User = require('../models/user');
const { generateToken } = require('../middlewares/authentication');

let authRouter = Router();

authRouter.post('/', async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    res.status(400).json({ message: 'All inputs are required' });
  }
  try {
    const user = await User.findOne({ username: username });
    if (user && password === user.password) {
      const token = generateToken(user._id, username, password, user.role);
      return res.status(200).json({ token: token });
    }
    res.status(400).json({ message: 'Invalid Credentials' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = authRouter;
