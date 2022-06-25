const Student = require("../../models/student.model");
const Classroom = require("../../models/classroom.model");
const { sortBy } = require("lodash");

module.exports = async (req, res) => {
  try {
    const [students, classrooms] = await Promise.all([
      Student.find(),
      Classroom.find(),
    ]);

    const classroomsMap = classrooms.reduce((acc, classroom) => {
      acc[classroom._id] = classroom;

      return acc;
    }, {});

    const mappingStudents = students.map((student, index) => ({
      _id: student._id,
      id: index + 1,
      key: student._id,
      name: student.name,
      order: student.order,
      classroomId: student.classroomId,
      classroomName: classroomsMap[student.classroomId].name,
      classroomOrder: classroomsMap[student.classroomId].order,
    }));

    return res.json({
      data: sortBy(mappingStudents, ["classroomOrder", "order", "_id"]),
    });
  } catch (error) {
    console.log(error);
  }
};
