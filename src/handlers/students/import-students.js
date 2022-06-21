const Student = require('../../models/student.model');
const Joi = require('joi');
const moment = require('moment');

const studentSchema = Joi.array().items(
    Joi.object({
      name: Joi.string().required()
    }).required()
);


module.exports = async (req, res) => {
  try {
    const classroomId = req.params?.id;
    if (!classroomId) {
      throw Error('Classroom id is required');
    }

    const students = await studentSchema.validateAsync(req.body?.students);

    if (!students) {
      throw Error('Students are required');
    }

    await Student.insertMany(students.map(student => ({
      name: student.name,
      classroomId: classroomId,
      createdAt: moment().unix()
    })));

    return res.json(students);
  } catch (error) {
    console.log(error);
  }
};