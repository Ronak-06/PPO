require('dotenv').config();
const express = require('express');
const cors = require('cors');
const prisma = require('./prisma/prismaClient');

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/', (req, res) => res.send('Team Task Manager API (PostgreSQL/Prisma) is running...'));

// Database connection test and server start
async function main() {
  try {
    await prisma.$connect();
    console.log('Connected to database via Prisma');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
}

main();
