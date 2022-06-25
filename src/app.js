const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

const classroomRouter = require("./routers/classroom.router");

const { PORT = 8080 } = process.env;

require("../mongooseFile");

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/classrooms", classroomRouter);

app.get("/", (_, res) => res.send("Hello World!"));

app.get("/api/students", require("./handlers/students/get-all-students"));

app.get("/api/results", require("./handlers/histories/get-result"));

app.use((err, req, res, next) => {
  res.status(400).json({
    data: null,
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`ENDPOINT: http://localhost:${PORT}`);
});
