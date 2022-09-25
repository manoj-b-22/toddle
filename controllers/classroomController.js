const Classroom = require('../models/classroom');

function checkTutor(req, res, next) {
  if (res.user.role !== 'Tutor') {
    return res
      .status(401)
      .json({ message: `No CUD permissions for ${res.user.role}` });
  }
  next();
}

async function createClassroom(req, res) {
  const { name } = req.body;
  const { files, students } = req.body || { files: [], students: [] };
  const owner = res.user.id;

  const classroom = new Classroom({
    name: name,
    files: files,
    owner: owner,
    students: students,
  });

  try {
    const newClassroom = await classroom.save();
    res.status(201).json(newClassroom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getClassroomById(req, res, nxt) {
  let classroom;
  try {
    classroom = await Classroom.findById(req.params.id);
    if (classroom === null) {
      return res.status(400).json({ message: 'classroom does not exist' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.classroom = classroom;
  nxt();
}

async function updateClassroom(req, res) {
  if (req.body.name !== null) {
    res.classroom.name = req.body.name;
  }
  if (
    req.body.students !== null &&
    req.body.studentOperation.toLowerCase() === 'full'
  ) {
    res.classroom.students = [...req.body.students];
  }
  if (
    req.body.students !== null &&
    req.body.studentOperation.toLowerCase() === 'update'
  ) {
    let students = req.body.students.filter(
      (i) => res.classroom.students.includes(i) === false
    );
    res.classroom.students = [...res.classroom.students, ...students];
  }
  if (
    req.body.students !== null &&
    req.body.studentOperation.toLowerCase() === 'remove'
  ) {
    res.classroom.students = res.classroom.students.filter((i) =>
      req.body.students.includes(i)
    );
  }
  if (
    req.body.files !== null &&
    req.body.fileOperation.toLowerCase() === 'full'
  ) {
    res.classroom.files = [...req.body.files];
  }
  if (
    req.body.files !== null &&
    req.body.fileOperation.toLowerCase() === 'update'
  ) {
    let files = req.body.files.filter(
      (i) => res.classroom.files.includes(i) == false
    );
    res.classroom.files = [...res.classroom.files, ...files];
  }
  if (
    req.body.files != null &&
    req.body.fileOperation.toLowerCase() === 'remove'
  ) {
    res.classroom.files = res.classroom.files.filter((i) =>
      req.body.students.includes(i)
    );
  }

  try {
    const updatedClassroom = await res.classroom.save();
    res.status(200).json(updatedClassroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteClassroom(req, res) {
  try {
    await res.classroom.remove();
    res.status(200).json({ message: 'deleted succesfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  checkTutor,
  getClassroomById,
  createClassroom,
  updateClassroom,
  deleteClassroom,
};
