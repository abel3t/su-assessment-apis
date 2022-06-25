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

app.all("*", function (req, res, next) {
  if (!req.get("Origin")) return next();

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,POST,PUT");
  res.set("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");

  if ("OPTIONS" == req.method) return res.send(200);

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
