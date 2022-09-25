const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description:{
    type: String
  },
  filetype: {
    type: String,
    enum: ['AUDIO', 'VIDEO', 'IMAGE', 'URL'],
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('File', fileSchema);
