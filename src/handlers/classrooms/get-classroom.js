const Classroom = require('../../models/classroom.model');

module.exports = async (req, res) => {
  try {
    const { classroomId } = req.params;
    if (!classroomId) {
      throw Error('Classroom id is required');
    }

    const classroom = await Classroom.findById(classroomId);

    return res.json({ data: classroom});
  } catch (error) {
    console.log(error);
  }
};