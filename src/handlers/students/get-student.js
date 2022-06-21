const Student = require('../../models/student.model');

module.exports = async (req, res) => {
  try {
    const { classroomId, studentId } = req.params;
    if (!classroomId) {
      throw Error('Classroom id is required');
    }

    if (!studentId) {
      throw Error('Student id is required');
    }

    const student = await Student.findOne({ _id: studentId, classroomId });

    return res.json({ data: student });
  } catch (error) {
    console.log(error);
  }
};