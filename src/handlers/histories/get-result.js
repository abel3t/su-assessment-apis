const History = require("../../models/history.model");
const Student = require("../../models/student.model");
const Classroom = require("../../models/classroom.model");

module.exports = async (_req, res) => {
  try {
    const [students, classrooms, votes] = await Promise.all([
      Student.find(),
      Classroom.find(),
      History.find(),
    ]);

    const classroomsMap = classrooms.reduce((acc, classroom) => {
      acc[classroom._id] = classroom;
      return acc;
    }, {});

    const votesMap = votes.reduce((acc, vote) => {
      if (!acc[vote.studentId]) {
        acc[vote.studentId] = [];
      }

      acc[vote.studentId] = acc[vote.studentId].concat(vote);
      return acc;
    }, {});

    const votedStudents = students.map((student) => {
      const _votes = votesMap[student._id] || [];
      return {
        _id: student._id,
        name: student.name,
        classroomName: classroomsMap[student.classroomId].name,
        classroomId: student.classroomId,
        votes: _votes,
        totalVotes: _votes.length,
      };
    });

    votedStudents.sort((a, b) => b.totalVotes - a.totalVotes);

    return res.json({
      data: votedStudents.map((votedStudent, index) => ({
        ...votedStudent,
        key: votedStudent._id,
        id: index + 1,
      })),
    });
  } catch (error) {
    console.log(error);
  }
};
