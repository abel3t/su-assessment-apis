const History = require("../../models/history.model");
const { CriteriaType } = require("../../constant");

module.exports = async (req, res, next) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const { classroomId, studentId } = req.params;
    const { type, dateTime } = req.body;
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
      createdAt: dateTime,
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
