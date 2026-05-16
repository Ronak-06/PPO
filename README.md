# TaskFlow - Team Task Manager (SQLite + Prisma)

A production-ready project management application built with the SERN stack (SQLite, Express, React, Node).

## Features

- **Role-Based Access Control (RBAC):** Admin and Member roles with specific permissions.
- **Project Tracking:** Create and manage projects with deadlines and status tracking.
- **Task Management:** Full CRUD for tasks with priority levels, assignees, and real-time status updates.
- **Member Management:** Role-based access control for Admins and Members.
- **Premium UI:** Built with React, Tailwind CSS, and Framer Motion for a smooth, modern experience.

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Framer Motion, Lucide React
- **Backend:** Node.js, Express.js
- **Database:** SQLite (Prisma ORM)
- **Authentication:** JWT, bcrypt.js

## Setup Instructions

### Prerequisites

- Node.js installed
- Node.js installed
- Anthropic API Key

### Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   PORT=5000
   DATABASE_URL="file:./dev.db"
   JWT_SECRET=your_secret_key
   ANTHROPIC_API_KEY=your_anthropic_key
   ```
4. Generate Prisma Client and migrate:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (optional, defaults to localhost):
   ```bash
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Auth
- `POST /api/auth/register` - Create a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/members` - List all members (Admin only)

### Projects
- `GET /api/projects` - Get projects (Member sees assigned, Admin sees all)
- `POST /api/projects` - Create project (Admin only)
- `PUT /api/projects/:id` - Update project (Admin only)
- `DELETE /api/projects/:id` - Delete project (Admin only)

### Tasks
- `GET /api/tasks` - Get tasks (Member sees assigned, Admin sees all)
- `POST /api/tasks` - Create task (Admin only)
- `PUT /api/tasks/:id` - Update task (Members can update status, Admin can update all)
- `DELETE /api/tasks/:id` - Delete task (Admin only)

### AI
- `POST /api/ai/generate-description` - Generate task description
- `POST /api/ai/suggest-priority` - Suggest task priority
- `POST /api/ai/smart-summary` - Generate project summary

## Deployment (Railway)

### Option 1: Two Separate Services (Recommended)

1. **Backend Service:**
   - Link the repo to a new Railway project.
   - Set the **Root Directory** to `server`.
   - Add Environment Variables:
     - `DATABASE_URL`: Your PostgreSQL/SQLite URL.
     - `JWT_SECRET`: A long random string.
     - `ANTHROPIC_API_KEY`: Your Claude API key.
     - `CLIENT_URL`: The URL of your frontend service (once deployed).
   - Railway will automatically run `npm run build` (Prisma generate) and `npm start`.

2. **Frontend Service:**
   - Link the repo again as a separate service.
   - Set the **Root Directory** to `client`.
   - Add Environment Variables:
     - `VITE_API_URL`: The URL of your backend service (e.g., `https://backend.up.railway.app/api`).
   - Railway will detect it's a Vite app, run `npm run build`, and serve the `dist` folder.

### Option 2: Unified Deployment
- You can also deploy the backend and have it serve the frontend `dist` folder as static files. To do this, run `npm run build` in `client`, copy `dist` to `server`, and update `server.js` to use `express.static()`.

## License

MIT
