const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  taskId:String,
  task: String,
  description: String,
  time: String,
  date: Date,
  status: String
});

module.exports = mongoose.model("TodoList", todoSchema);
