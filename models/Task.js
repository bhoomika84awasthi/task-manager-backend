const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  dueDate: String,
  status: { type: String, enum: ['pending', 'done'], default: 'pending' },
});

module.exports = mongoose.model('Task', taskSchema);
