const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, trim: true },
  order: { type: Number },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Number },
  updateAt: { type: Number }
});

module.exports = mongoose.model('Classroom', schema, 'Classroom');