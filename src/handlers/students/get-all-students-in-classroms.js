const Student = require('../../models/student.model');

module.exports = async (req, res) => {
  try {
    const { classroomId } = req.params;
    if (!classroomId) {
      throw Error('Classroom id is required');
    }

    const students = await Student.find({ classroomId });

    return res.json({ data: students });
  } catch (error) {
    console.log(error);
  }
};