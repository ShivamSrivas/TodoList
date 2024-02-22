const Todo = require('../Config/Model');

exports.addTask = async (req, res) => {
  try {
    const { task, description, time, date, status } = req.body;
    const newTask = new Todo({
      task,
      description,
      time,
      date,
      status
    });
    await newTask.save();
    res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.selectAllTasks = async (req, res) => {
  try {
    const tasks = await Todo.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await Todo.findByIdAndDelete(taskId);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { task, description, time, date, status } = req.body;
    const updatedTask = await Todo.findByIdAndUpdate(
      taskId,
      { task, description, time, date, status },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
