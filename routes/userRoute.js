const { Router } = require('express');
const {
  getUserById,
  getAllUsers,
  postUser,
  getUser,
  patchUser,
  deleteUser,
} = require('../controllers/userController');

let userRouter = Router();

// get all users
userRouter.get('/', getAllUsers);

// create a user
userRouter.post('/', postUser);

// get user by id
userRouter.get('/:id', getUserById, getUser);

// update user
userRouter.patch('/:id', getUserById, patchUser);

// delete user
userRouter.delete('/:id', getUserById, deleteUser);

module.exports = userRouter;
