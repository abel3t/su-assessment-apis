const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

const Student = require("./models/student.model");
const Classroom = require("./models/classroom.model");
const History = require("./models/history.model");
const { sortBy } = require("lodash");

const classroomRouter = require("./routers/classroom.router");

const { PORT = 8080 } = process.env;

require("../mongooseFile");

app.use(bodyParser.json());
app.use(cors());

app.use("/api/classrooms", classroomRouter);

app.get("/", (_, res) => res.send("Hello World!"));

app.get("/api/students", async (_, res) => {
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
});

app.get("/api/results", async (_, res) => {
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
});

app.use((err, req, res, next) => {
  console.log(err);
  res.json({
    data: null,
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`ENDPOINT: http://localhost:${PORT}`);
});
