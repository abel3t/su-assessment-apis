const router = require('express').Router();
const Classroom = require('../models/classroom.model');

// Import classrooms

router.post('/import', require('../handlers/classrooms/import-classrooms'));

router.post('/:id/students/import', require('../handlers/students/import-students'));

router.get('/', (req, res) => {
  res.send('Classroom');
});

module.exports = router;