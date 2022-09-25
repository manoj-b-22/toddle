const File = require('../models/file');
const Classroom = require('../models/classroom');

async function classesFeed(req, res) {
  if (res.user.role === 'Tutor') {
    try {
      let classes = await Classroom.find({ owner: res.user.id });
      res.json(classes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (res.user.role === 'Student') {
    try {
      let classes = await Classroom.find({
        students: { $elemMatch: { $eq: res.user.id } },
      });
      res.json(classes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: 'Invalid role of an User' });
  }
}

async function filesFeed(req, res) {
  let params = {};
  if (req.body.filetype != null) {
    params.filetype = req.body.filetype;
  }
  if (req.body.search != null) {
    params.name = { $regex: req.body.search, $options:"$i" };
  }
  try {
    const classroom = await Classroom.findById(req.params.id);
    let files = [];
    for (let f of classroom.files) {
      params._id = f;
      files.push(...await File.find(params));
    }
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { classesFeed, filesFeed };
