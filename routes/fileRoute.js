const { Router } = require('express');
const upload = require('../middlewares/multer');
const {
  createFile,
  updateFile,
  deleteFile,
  getFileById,
} = require('../controllers/fileController');
const { verifyToken } = require('../middlewares/authentication');
const { checkTutor } = require('../controllers/classroomController');

let fileRouter = Router();

fileRouter.post('/', upload.array('upload_file'), createFile);

fileRouter.patch('/:id', upload.single('upload_file'), getFileById, updateFile);

fileRouter.delete('/:id', verifyToken, checkTutor, getFileById, deleteFile);

module.exports = fileRouter;
