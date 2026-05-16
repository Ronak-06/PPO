# TaskFlow - Team Task Manager (SQLite + Prisma)

A production-ready project management application built with the SERN stack (SQLite, Express, React, Node) and integrated with Anthropic Claude AI.

## Features

- **Role-Based Access Control (RBAC):** Admin and Member roles with specific permissions.
- **Project Management:** Create, update, and track project progress.
- **Task Tracking:** Filterable task table with status and priority management.
- **AI-Powered Features:**
  - **Smart Description:** Generate task descriptions from titles and project context using Claude 3.5 Sonnet.
  - **Priority Suggestion:** Get AI-driven priority levels based on deadlines and task complexity.
  - **Project Summary:** Generate weekly progress summaries for projects.
- **Premium UI:** Built with React, Tailwind CSS, and Framer Motion for a smooth, modern experience.

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Framer Motion, Lucide React
- **Backend:** Node.js, Express.js
- **Database:** SQLite (Prisma ORM)
- **Authentication:** JWT, bcrypt.js
- **AI Integration:** Anthropic Claude SDK

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

1. **Backend:**
   - Link your GitHub repo to Railway.
   - Set the root directory to `server`.
   - Add all environment variables from `.env`.
   - Railway will automatically detect the `npm start` script.

2. **Frontend:**
   - Link the repo again as a separate service.
   - Set the root directory to `client`.
   - Set the Build Command: `npm run build`.
   - Set the Start Command (Static site): `npm run preview` or use a specialized static site provider.
   - Update `VITE_API_URL` to point to your live backend.

## License

MIT
