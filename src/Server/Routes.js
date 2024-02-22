const express = require('express');
const router = express.Router();
const taskController = require('./Controller');

router.post('/api/tasks', taskController.addTask);
router.get('/api/tasks', taskController.selectAllTasks); 
router.delete('/api/tasks/:id', taskController.deleteTask);
router.put('/api/tasks/:id', taskController.updateTask); 

module.exports = router;
