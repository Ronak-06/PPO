const prisma = require('../prisma/prismaClient');

const createProject = async (req, res) => {
  try {
    const { name, description, deadline, members } = req.body;
    const project = await prisma.project.create({
      data: {
        name,
        description,
        deadline: deadline ? new Date(deadline) : null,
        createdById: req.user.id,
        members: {
          connect: members?.map(id => ({ id })) || []
        }
      }
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const where = req.user.role !== 'admin' 
      ? { members: { some: { id: req.user.id } } } 
      : {};
      
    const projects = await prisma.project.findMany({
      where,
      include: {
        members: { select: { id: true, name: true, email: true } },
        createdBy: { select: { name: true } }
      }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { members, ...rest } = req.body;
    
    const updateData = {
      ...rest,
      deadline: rest.deadline ? new Date(rest.deadline) : undefined,
    };

    if (members) {
      updateData.members = {
        set: members.map(id => ({ id }))
      };
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProject, getProjects, updateProject, deleteProject };
