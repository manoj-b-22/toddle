const fs = require('fs');
const path = require('path');
const File = require('../models/file');

async function createFile(req, res) {
  const description = req.body.description || '';
  const { filetype } = req.body;
  let files = [];
  let i = 0;
  for (let f of req.files) {
    const file = new File({
      name: f.originalname,
      description: description,
      filetype: filetype[i],
      uploadedBy: req.user.id,
      path: path.relative(__dirname, f.path),
    });
    i += 1;
    try {
      const newFile = await file.save();
      files.push(newFile);
    } catch (error) {
      return res.status(400).json({ message: error.message, uplaoded:`${i-1} files are uploaded`});
    }
  }
  res.status(201).json(files);
}

async function getFileById(req, res, nxt) {
  let file;
  try {
    file = await File.findById(req.params.id);
    if (file === null) {
      return res.status(400).json({ message: 'file does not exist' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.file = file;
  nxt();
}

async function deleteFile(req, res) {
  try {
    fs.unlinkSync(`./uploads/${res.file.name}`);
    await res.file.remove();
    res.status(200).json({ message: 'deleted succesfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateFile(req, res) {
  if (req.body.file !== null) {
    fs.unlinkSync(`./uploads/${res.file.name}`);
    res.file.name = req.file.originalname;
    res.file.path = req.file.path;
  }
  if (req.body.description !== null) {
    res.file.description = req.body.description;
  }
  if (req.body.filetype !== null) {
    res.file.filetype = req.body.filetype;
  }
  try {
    const updatedFile = await res.file.save();
    res.status(200).json(updatedFile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getFileById, createFile, updateFile, deleteFile };
