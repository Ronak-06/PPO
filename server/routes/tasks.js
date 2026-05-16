const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/', verifyToken, getTasks);
router.post('/', verifyToken, isAdmin, createTask);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, isAdmin, deleteTask);

module.exports = router;
