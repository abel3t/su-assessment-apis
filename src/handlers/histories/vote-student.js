const History = require('../../models/history.model');
const { CriteriaType } = require('../../constant');

module.exports = async (req, res, next) => {
  try {
    const { classroomId, studentId } = req.params;
    const { type, dateTime } = req.body;
    if (!classroomId) {
      throw Error('Classroom id is required');
    }

    if (!studentId) {
      throw Error('Student id is required');
    }

    if (!type || !CriteriaType[type]) {
      return next(new Error('Type is required'));
    }

    await History.create({
      classroomId,
      studentId,
      type,
      createdAt: dateTime
    });

    return res.json({
      data: {
        classroomId,
        studentId,
        type
      }
    });
  } catch (error) {
    console.log(error);
  }
};