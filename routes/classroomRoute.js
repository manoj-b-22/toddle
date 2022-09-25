const { Router } = require('express');
const { verifyToken } = require('../middlewares/authentication');
const {
  checkTutor,
  getClassroomById,
  createClassroom,
  updateClassroom,
  deleteClassroom,
} = require('../controllers/classroomController');

let classroomRouter = Router();

classroomRouter.post('/', verifyToken, checkTutor, createClassroom);

classroomRouter.patch(
  '/:id',
  verifyToken,
  checkTutor,
  getClassroomById,
  updateClassroom
);

classroomRouter.delete(
  '/:id',
  verifyToken,
  checkTutor,
  getClassroomById,
  deleteClassroom
);

module.exports = classroomRouter;
