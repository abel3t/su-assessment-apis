const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

const classroomRouter = require("./routers/classroom.router");

const { PORT = 8080 } = process.env;

require("../mongooseFile");

app.use(bodyParser.json());

app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"],
    exposedHeaders: [],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.use("/api/classrooms", classroomRouter);

app.get("/", (_, res) => res.send("Hello World!"));

app.get("/api/students", require("./handlers/students/get-all-students"));

app.get("/api/results", require("./handlers/histories/get-result"));

app.post("/api/test", (_, res) => {
  res.json({ status: "OK" });
});

app.post("/api/vote", require("./handlers/histories/vote-student"));
app.post("/api/vote2", (_req, res) => res.json({ data: "OK" }));

app.use((err, req, res, next) => {
  res.status(400).json({
    data: null,
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`ENDPOINT: http://localhost:${PORT}`);
});
