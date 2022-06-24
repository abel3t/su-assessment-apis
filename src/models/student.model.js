const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  classroomId: { type: String, trim: true },
  name: { type: String, trim: true },
  order: { type: Number },
  isActive: { type: Boolean, default: true },
  phone: { type: String, trim: true, default: '' }
});

module.exports = mongoose.model('Student', schema, 'Student');