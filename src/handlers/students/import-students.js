const Student = require("../../models/student.model");
const Joi = require("joi");
const moment = require("moment");

const studentSchema = Joi.array().items(
  Joi.object({
    name: Joi.string().required(),
  }).required()
);

module.exports = async (req, res, next) => {
  try {
    const { classroomId } = req.params;
    if (!classroomId) {
      throw Error("Classroom id is required");
    }

    const students = await studentSchema.validateAsync(req.body?.students);

    if (!students) {
      throw Error("Students are required");
    }

    await Student.insertMany(
      students.map((student, index) => {
        const nameWords = student.name.split(" ");
        const firstName = nameWords[nameWords.length - 1];

        return {
          name: student.name,
          firstName,
          order: index,
          classroomId: classroomId,
          createdAt: moment().unix(),
        };
      })
    );

    return res.json({ data: students });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
