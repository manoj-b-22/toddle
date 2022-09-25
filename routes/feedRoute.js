const { Router } = require('express');
const { verifyToken } = require('../middlewares/authentication');
const { classesFeed, filesFeed } = require('../controllers/feedController');

let feedRouter = Router();

feedRouter.get('/classes', verifyToken, classesFeed);

feedRouter.patch('/files/:id', verifyToken, filesFeed);

module.exports = feedRouter;
