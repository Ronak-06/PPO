# TaskFlow — Team Task Manager

<div align="center">

![TaskFlow Banner](https://img.shields.io/badge/TaskFlow-Team%20Task%20Manager-22c55e?style=for-the-badge&logoColor=white)

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma%20ORM-336791?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Railway](https://img.shields.io/badge/Deploy-Railway-0B0D0E?style=flat-square&logo=railway&logoColor=white)](https://railway.app)
[![License](https://img.shields.io/badge/License-ISC-green?style=flat-square)](LICENSE)

**A production-ready, full-stack team task management application built with a dark green/black gradient UI.**

[Live Demo](#) · [Report Bug](https://github.com/Ronak-06/PPO/issues) · [Request Feature](https://github.com/Ronak-06/PPO/issues)

</div>

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login & registration with bcrypt password hashing
- 👥 **Role-Based Access Control** — Admin and Member roles with fine-grained permissions
- 📁 **Project Management** — Create, update, track projects with deadlines and status
- ✅ **Task Management** — Full CRUD for tasks with priority levels, assignees, and status updates
- 👤 **Member Management** — Admins can view and manage all team members
- 🎨 **Premium Dark UI** — Green/black gradient theme with glassmorphism and animations
- 🌐 **Landing Page** — Stunning marketing page with features, stats, and testimonials
- 📊 **Live Dashboard** — Real-time stats, progress tracking, and task overview
- 🚀 **Railway Ready** — Auto-migrations on deploy, zero manual setup

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS v4, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (via Prisma ORM) |
| **Authentication** | JWT + bcryptjs |
| **Deployment** | Railway |
| **Icons** | Lucide React |
| **Fonts** | Space Grotesk, Inter (Google Fonts) |

---

## 🗂 Project Structure

```
PPO/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx  # Public landing page
│   │   │   ├── Login.jsx    # Authentication
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── Members.jsx
│   │   ├── components/
│   │   │   └── Layout.jsx   # Sidebar + Header shell
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── api/
│   │   │   └── axios.js
│   │   └── index.css        # Global design system
│   └── package.json
│
├── server/                  # Node.js + Express backend
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── auth.js          # JWT verify + isAdmin
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── tasks.js
│   ├── prisma/
│   │   ├── schema.prisma    # DB models
│   │   ├── prismaClient.js
│   │   └── migrations/      # Auto-generated SQL migrations
│   ├── server.js
│   └── package.json
│
├── package.json             # Root scripts for Railway
└── README.md
```

---

## 🗄 Database Schema

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(member)   // admin | member
  ...
}

model Project {
  id          String        @id @default(uuid())
  name        String
  description String?
  deadline    DateTime?
  status      ProjectStatus @default(active)  // active | completed
  members     User[]
  tasks       Task[]
  ...
}

model Task {
  id          String       @id @default(uuid())
  title       String
  description String?
  priority    TaskPriority @default(Medium)  // High | Medium | Low
  status      TaskStatus   @default(Todo)   // Todo | In_Progress | Done
  dueDate     DateTime?
  assignee    User?
  project     Project
  ...
}
```

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js** v18+
- **PostgreSQL** database (local or cloud)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/Ronak-06/PPO.git
cd PPO
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/taskflow"
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

Run database migrations:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

Start the backend:
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create a `.env` file inside `client/`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
# App runs on http://localhost:5173
```

---

## 🌐 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login & get JWT | Public |
| GET | `/api/auth/me` | Get current user | Required |
| GET | `/api/auth/members` | Get all users | Admin |

### Projects
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/projects` | Get all projects | Required |
| POST | `/api/projects` | Create project | Admin |
| PUT | `/api/projects/:id` | Update project | Admin |
| DELETE | `/api/projects/:id` | Delete project | Admin |

### Tasks
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/tasks` | Get all tasks | Required |
| POST | `/api/tasks` | Create task | Admin |
| PUT | `/api/tasks/:id` | Update task | Required |
| DELETE | `/api/tasks/:id` | Delete task | Admin |

---

## ☁️ Deploy to Railway

### Step 1 — Add PostgreSQL
1. Go to [Railway](https://railway.app) and create a new project
2. Click **+ New Service** → **PostgreSQL**
3. Copy the **DATABASE_URL** from the PostgreSQL service's variables tab

### Step 2 — Deploy the App
1. Click **+ New Service** → **GitHub Repo** → select `Ronak-06/PPO`
2. Railway will auto-detect the project and run the build

### Step 3 — Set Environment Variables
In your app service on Railway, add these variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Paste from PostgreSQL service |
| `JWT_SECRET` | Any long random string |
| `NODE_ENV` | `production` |

### Step 4 — Deploy
Click **Deploy** — Railway will:
1. Install dependencies
2. Build the React app
3. Generate the Prisma client
4. **Auto-run database migrations** (creates all tables)
5. Start the server

> ✅ No manual `prisma migrate` step needed — it runs automatically!

---

## 🎨 UI Pages

| Route | Page | Access |
|-------|------|--------|
| `/` | Landing Page | Public |
| `/login` | Sign In | Public |
| `/register` | Sign Up | Public |
| `/app/dashboard` | Dashboard & Stats | Authenticated |
| `/app/projects` | Project Management | Authenticated |
| `/app/tasks` | Task Management | Authenticated |
| `/app/members` | Team Members | Admin Only |

---

## 🔒 Roles & Permissions

| Action | Member | Admin |
|--------|--------|-------|
| View projects | ✅ | ✅ |
| Create/Edit/Delete projects | ❌ | ✅ |
| View tasks | ✅ | ✅ |
| Create/Delete tasks | ❌ | ✅ |
| Update own task status | ✅ | ✅ |
| View all members | ❌ | ✅ |

---

## 📦 Key Dependencies

### Backend
| Package | Purpose |
|---------|---------|
| `express` | Web framework |
| `@prisma/client` | Database ORM |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT auth |
| `cors` | Cross-origin support |
| `dotenv` | Environment config |

### Frontend
| Package | Purpose |
|---------|---------|
| `react` + `react-dom` | UI framework |
| `vite` | Build tool |
| `tailwindcss` | Styling |
| `framer-motion` | Animations |
| `axios` | HTTP client |
| `lucide-react` | Icons |
| `react-router-dom` | Routing |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the ISC License. See `LICENSE` for more information.

---

<div align="center">

**Built with ❤️ using React, Node.js, and PostgreSQL**

[⬆ Back to Top](#taskflow--team-task-manager)

</div>
