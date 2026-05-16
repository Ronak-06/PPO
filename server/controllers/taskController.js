const prisma = require('../prisma/prismaClient');

const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, assignee, project } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority || 'Medium',
        dueDate: dueDate ? new Date(dueDate) : null,
        assigneeId: assignee || null,
        projectId: project,
        createdById: req.user.id
      }
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const where = req.user.role !== 'admin' 
      ? { assigneeId: req.user.id } 
      : {};
      
    const tasks = await prisma.task.findMany({
      where,
      include: {
        assignee: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true } },
        createdBy: { select: { name: true } }
      }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role !== 'admin') {
      if (task.assigneeId !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to update this task' });
      }
      const { status } = req.body;
      const updatedTask = await prisma.task.update({
        where: { id },
        data: { status }
      });
      return res.json(updatedTask);
    }

    const { assignee, project, dueDate, ...rest } = req.body;
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...rest,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        assigneeId: assignee || undefined,
        projectId: project || undefined
      }
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({ where: { id } });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
