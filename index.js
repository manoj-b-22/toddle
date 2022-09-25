const fs = require('fs');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const URL = process.env.DATABASE_URL;
mongoose.connect(URL);

const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
});
db.once('open', () => {
  console.log('MongoDB Database connection established');
});

const folder = './uploads';
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
  console.log(`${folder} created successfully`);
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('./uploads'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const fileRouter = require('./routes/fileRoute');
const feedRouter = require('./routes/feedRoute');
const classroomRouter = require('./routes/classroomRoute');

app.use('/feed', feedRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/files', fileRouter);
app.use('/classrooms', classroomRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
