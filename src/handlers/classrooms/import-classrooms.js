const Classroom = require('../../models/classroom.model');
const Joi = require('joi');
const moment = require('moment');

const classroomSchema = Joi.array().items(
    Joi.object({
      name: Joi.string().required()
    }).required()
);

module.exports = async (req, res) => {
  try {
    const classrooms = await classroomSchema.validateAsync(
        req.body?.classrooms);

    if (!classrooms) {
      throw Error('Classrooms are required');
    }

    await Classroom.insertMany(classrooms.map((classroom, index) => ({
      name: classroom.name,
      order: index,
      isActive: true,
      createdAt: moment().unix()
    })));

    return res.json({ data: classrooms });
  } catch (error) {
    console.log(error);
  }
};