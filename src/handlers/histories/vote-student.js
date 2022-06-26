const History = require("../../models/history.model");
const { CriteriaType } = require("../../constant");
const moment = require("moment");

module.exports = async (req, res, next) => {
  try {
    const { type, classroomId, studentId } = req.body;
    if (!classroomId) {
      throw next(new Error("Classroom id is required"));
    }

    if (!studentId) {
      throw next(new Error("Student id is required"));
    }

    if (!type || !CriteriaType[type]) {
      throw next(new Error("Type is required"));
    }

    await History.create({
      classroomId,
      studentId,
      type,
      createdAt: moment().unix(),
    });

    return res.json({
      data: {
        classroomId,
        studentId,
        type,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
