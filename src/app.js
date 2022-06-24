const app = require('express')();
const bodyParser = require('body-parser');

const classroomRouter = require('./routers/classroom.router');

const { PORT = 8080 } = process.env;

require('../mongooseFile');

app.use(bodyParser.json());

app.use('/api/classrooms', classroomRouter);

app.get('/api/results', require('./handlers/histories/get-result'));

app.use((err, req, res, next) => {
  console.log(err);
  res.json({
    data: null,
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`ENDPOINT: http://localhost:${PORT}`);
});