const app = require('express')();
const bodyParser = require('body-parser');

const classroomRouter = require('./routers/classroom.router');

const { PORT = 8080 } = process.env;

require('../mongooseFile');

app.use(bodyParser.json());

app.use('/api/classrooms', classroomRouter);
app.listen(PORT, () => {
  console.log(`ENDPOINT: http://localhost:${PORT}`);
});