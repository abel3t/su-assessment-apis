const History = require('../../models/history.model');
const moment = require('moment');
const { CriteriaType } = require('../../constant');

module.exports = async (req, res, next) => {
  try {
    const { classroomId, studentId } = req.params;
    const { type } = req.body;
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
      createdAt: moment().unix()
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