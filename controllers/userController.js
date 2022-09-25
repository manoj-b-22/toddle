const User = require('../models/user');

// get user by id
async function getUserById(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user === null) {
      return res.status(400).json({ message: 'user does not exist' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next()
}

// get user collection
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// create user
async function postUser(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// get user
async function getUser(req, res) {
  res.status(200).json(res.user);
}

// update user
async function patchUser(req, res) {
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.role != null) {
    res.user.role = req.body.role;
  }
  try {
    const updatedUser = await res.user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// delete user
async function deleteUser(req, res) {
  try {
    await res.user.remove();
    res.status(200).json({ message: 'deleted succesfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getUserById ,getAllUsers, postUser, getUser, patchUser, deleteUser };
