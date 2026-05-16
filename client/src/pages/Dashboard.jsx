import { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  ArrowUpRight,
  MoreVertical
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-2xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium bg-emerald-50 px-2 py-1 rounded-lg">
          <ArrowUpRight className="w-4 h-4" />
          {trend}
        </span>
      )}
    </div>
    <p className="text-slate-500 text-sm font-medium">{title}</p>
    <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [tasksRes] = await Promise.all([
          api.get('/tasks')
        ]);
        
        const tasks = tasksRes.data;
        const now = new Date();
        
        setStats({
          totalTasks: tasks.length,
          completedTasks: tasks.filter(t => t.status === 'Done').length,
          pendingTasks: tasks.filter(t => t.status !== 'Done').length,
          overdueTasks: tasks.filter(t => t.status !== 'Done' && new Date(t.dueDate) < now).length
        });
        
        setRecentTasks(tasks.slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="animate-pulse space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-200 rounded-3xl"></div>)}
    </div>
  </div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Tasks" 
          value={stats.totalTasks} 
          icon={TrendingUp} 
          color="bg-primary-500"
          trend="+12%"
        />
        <StatCard 
          title="Completed" 
          value={stats.completedTasks} 
          icon={CheckCircle2} 
          color="bg-emerald-500"
        />
        <StatCard 
          title="In Progress" 
          value={stats.pendingTasks} 
          icon={Clock} 
          color="bg-amber-500"
        />
        <StatCard 
          title="Overdue" 
          value={stats.overdueTasks} 
          icon={AlertCircle} 
          color="bg-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Recent Tasks</h3>
            <button className="text-primary-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-10 rounded-full ${
                    task.priority === 'High' ? 'bg-rose-500' : 
                    task.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <div>
                    <h4 className="font-semibold text-slate-900">{task.title}</h4>
                    <p className="text-xs text-slate-500">{task.project?.name} • Due {new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    task.status === 'Done' ? 'bg-emerald-100 text-emerald-700' :
                    task.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {task.status}
                  </span>
                  <button className="p-2 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            {recentTasks.length === 0 && (
              <p className="text-center py-8 text-slate-500">No recent tasks found.</p>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Project Progress</h3>
          <div className="space-y-6">
            <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100">
              <p className="text-sm font-bold text-primary-900 mb-2">Overall Completion</p>
              <div className="h-3 bg-white rounded-full overflow-hidden border border-primary-100">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.completedTasks / stats.totalTasks * 100) || 0}%` }}
                  className="h-full bg-primary-600 rounded-full"
                />
              </div>
              <p className="text-xs text-primary-700 mt-2 font-medium">
                {Math.round((stats.completedTasks / stats.totalTasks * 100) || 0)}% of tasks finished
              </p>
            </div>
            
            <div className="mt-8">
              <div className="flex items-center gap-2 text-rose-600 font-bold mb-4">
                <AlertCircle className="w-5 h-5" />
                Attention Required
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                You have <span className="font-bold text-rose-600">{stats.overdueTasks}</span> tasks past their deadline. 
                Focus on these items to maintain project momentum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
