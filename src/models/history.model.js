const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  classroomId: { type: String, trim: true },
  studentId: { type: String, trim: true },
  type: { type: String, trim: true }
});

module.exports = mongoose.model('History', schema, 'History');