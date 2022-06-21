const Classroom = require('../../models/classroom.model');

module.exports = async (req, res) => {
  try {

    const classrooms = await Classroom.find({});

    return res.json({
      data: classrooms
    });
  } catch (error) {
    console.log(error);
  }
};