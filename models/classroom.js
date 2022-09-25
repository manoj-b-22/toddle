const mongoose = require('mongoose');

const classroomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('Classroom', classroomSchema);
