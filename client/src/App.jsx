import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Members from './pages/Members';
import Layout from './components/Layout';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return (
    <div className="gradient-bg h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-green-400/60 text-sm">Loading...</p>
      </div>
    </div>
  );
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" />;

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/app" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/app/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="members" element={
          <ProtectedRoute adminOnly>
            <Members />
          </ProtectedRoute>
        } />
      </Route>

      {/* Legacy routes redirect */}
      <Route path="/dashboard" element={<Navigate to="/app/dashboard" />} />
      <Route path="/projects" element={<Navigate to="/app/projects" />} />
      <Route path="/tasks" element={<Navigate to="/app/tasks" />} />
      <Route path="/members" element={<Navigate to="/app/members" />} />
    </Routes>
  );
}

export default App;
