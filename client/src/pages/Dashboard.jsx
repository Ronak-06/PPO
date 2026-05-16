import { useState, useEffect } from 'react';
import api from '../api/axios';
import { CheckCircle2, Clock, AlertCircle, TrendingUp, ArrowUpRight, MoreVertical, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, trend, delay = 0 }) => (
  <motion.div
    className="stat-card p-5"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`p-2.5 rounded-xl ${color}`}>
        <Icon className="w-5 h-5 text-black" />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-green-400 text-xs font-semibold badge-green">
          <ArrowUpRight className="w-3 h-3" />
          {trend}
        </span>
      )}
    </div>
    <p style={{ color: 'rgba(134,239,172,0.5)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</p>
    <h3 className="text-3xl font-black text-white mt-1" style={{ fontFamily: 'Space Grotesk' }}>{value}</h3>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ totalTasks: 0, completedTasks: 0, pendingTasks: 0, overdueTasks: 0 });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [tasksRes] = await Promise.all([api.get('/tasks')]);
        const tasks = tasksRes.data;
        const now = new Date();
        setStats({
          totalTasks: tasks.length,
          completedTasks: tasks.filter(t => t.status === 'Done').length,
          pendingTasks: tasks.filter(t => t.status !== 'Done').length,
          overdueTasks: tasks.filter(t => t.status !== 'Done' && new Date(t.dueDate) < now).length,
        });
        setRecentTasks(tasks.slice(0, 6));
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const completionPct = Math.round((stats.completedTasks / (stats.totalTasks || 1)) * 100);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>Dashboard</h2>
          <p style={{ color: 'rgba(134,239,172,0.4)', fontSize: '0.875rem' }}>Welcome back! Here's your team's pulse.</p>
        </div>
        <div className="badge-green flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" />
          Live
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Tasks" value={stats.totalTasks} icon={TrendingUp} color="bg-green-400" trend="+12%" delay={0} />
        <StatCard title="Completed" value={stats.completedTasks} icon={CheckCircle2} color="bg-green-400" delay={0.05} />
        <StatCard title="In Progress" value={stats.pendingTasks} icon={Clock} color="bg-yellow-400" delay={0.1} />
        <StatCard title="Overdue" value={stats.overdueTasks} icon={AlertCircle} color="bg-red-400" delay={0.15} />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <motion.div
          className="lg:col-span-2 glass-card"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        >
          <div className="p-5 border-b" style={{ borderColor: 'rgba(34,197,94,0.08)' }}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Recent Tasks</h3>
              <button className="text-xs" style={{ color: '#22c55e' }}>View All →</button>
            </div>
          </div>
          <div className="divide-y" style={{ borderColor: 'rgba(34,197,94,0.06)' }}>
            {recentTasks.length === 0 ? (
              <p className="text-center py-12 text-sm" style={{ color: 'rgba(134,239,172,0.3)' }}>No tasks yet. Create your first!</p>
            ) : recentTasks.map((task) => (
              <div key={task.id || task._id}
                className="flex items-center justify-between px-5 py-3.5 transition-colors"
                style={{ cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(34,197,94,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-8 rounded-full ${
                    task.priority === 'High' ? 'bg-red-500' :
                    task.priority === 'Medium' ? 'bg-yellow-400' : 'bg-green-400'
                  }`} />
                  <div>
                    <p className="text-sm font-semibold text-white">{task.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(134,239,172,0.35)' }}>
                      {task.project?.name} · Due {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}
                    </p>
                  </div>
                </div>
                <span className={
                  task.status === 'Done' ? 'status-done' :
                  task.status === 'In_Progress' || task.status === 'In Progress' ? 'status-progress' : 'status-todo'
                }>
                  {task.status === 'In_Progress' ? 'In Progress' : task.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Progress Card */}
        <motion.div
          className="glass-card p-5 space-y-6"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        >
          <h3 className="font-bold text-white text-sm">Team Progress</h3>

          {/* Completion ring / bar */}
          <div className="p-4 rounded-xl" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.12)' }}>
            <div className="flex items-end justify-between mb-3">
              <p className="text-xs font-semibold" style={{ color: 'rgba(134,239,172,0.5)' }}>Overall Completion</p>
              <span className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>{completionPct}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(34,197,94,0.1)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #22c55e, #4ade80)' }}
                initial={{ width: 0 }}
                animate={{ width: `${completionPct}%` }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs mt-2" style={{ color: 'rgba(134,239,172,0.35)' }}>
              {stats.completedTasks} of {stats.totalTasks} tasks finished
            </p>
          </div>

          {/* Priority breakdown */}
          <div>
            <p className="text-xs font-semibold mb-3" style={{ color: 'rgba(134,239,172,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Status Breakdown
            </p>
            {[
              { label: 'Completed', count: stats.completedTasks, color: '#22c55e' },
              { label: 'In Progress', count: stats.pendingTasks - stats.overdueTasks, color: '#818cf8' },
              { label: 'Overdue', count: stats.overdueTasks, color: '#f87171' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs" style={{ color: 'rgba(240,253,244,0.6)' }}>{item.label}</span>
                </div>
                <span className="text-xs font-bold" style={{ color: item.color }}>{Math.max(0, item.count)}</span>
              </div>
            ))}
          </div>

          {/* Alert */}
          {stats.overdueTasks > 0 && (
            <div className="p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold mb-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Attention Required
              </div>
              <p className="text-xs" style={{ color: 'rgba(248,113,113,0.7)' }}>
                {stats.overdueTasks} task{stats.overdueTasks > 1 ? 's are' : ' is'} past deadline.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
