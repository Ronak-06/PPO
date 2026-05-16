import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { 
  Plus, 
  Filter, 
  Search, 
  MoreVertical, 
  Clock,
  User,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskModal = ({ isOpen, onClose, onSave, task = null, projects = [], members = [] }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Todo',
    dueDate: '',
    assignee: '',
    project: ''
  });

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        assignee: task.assignee?._id || task.assignee || '',
        project: task.project?._id || task.project || ''
      });
    } else {
      setFormData({ 
        title: '', description: '', priority: 'Medium', 
        status: 'Todo', dueDate: '', assignee: '', project: '' 
      });
    }
  }, [task]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-y-auto">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 my-8"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-900">
              {task ? 'Edit Task' : 'Create New Task'}
            </h3>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="label">Task Title</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="col-span-2">
                <label className="label">Description</label>
                <textarea 
                  className="input-field min-h-[120px]" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="label">Project</label>
                <select 
                  className="input-field"
                  value={formData.project}
                  onChange={(e) => setFormData({...formData, project: e.target.value})}
                  required
                >
                  <option value="">Select Project</option>
                  {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                </select>
              </div>

              <div>
                <label className="label">Assignee</label>
                <select 
                  className="input-field"
                  value={formData.assignee}
                  onChange={(e) => setFormData({...formData, assignee: e.target.value})}
                  required
                >
                  <option value="">Select Member</option>
                  {members.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
                </select>
              </div>

              <div>
                <label className="label">Priority</label>
                <select 
                  className="input-field"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="label">Status</label>
                <select 
                  className="input-field"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div>
                <label className="label">Due Date</label>
                <input 
                  type="date" 
                  className="input-field" 
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-50">
              <button type="button" onClick={onClose} className="flex-1 btn-secondary">Cancel</button>
              <button type="submit" className="flex-1 btn-primary">Save Task</button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ status: 'all', priority: 'all', search: '' });
  const { isAdmin, user } = useAuth();

  const fetchData = async () => {
    try {
      const [tasksRes, projectsRes, membersRes] = await Promise.all([
        api.get('/tasks'),
        api.get('/projects'),
        isAdmin ? api.get('/auth/members') : Promise.resolve({ data: [] })
      ]);
      setTasks(tasksRes.data);
      setProjects(projectsRes.data);
      setMembers(membersRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAdmin]);

  const handleSave = async (formData) => {
    try {
      if (formData._id) {
        await api.put(`/tasks/${formData._id}`, formData);
      } else {
        await api.post('/tasks', formData);
      }
      await fetchData();
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving task');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      await fetchData();
    } catch (err) {
      alert('Error updating status');
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filters.status === 'all' || task.status === filters.status;
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
    const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                          task.project?.name.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Tasks</h2>
          <p className="text-slate-500">Track and manage individual tasks across projects.</p>
        </div>
        {isAdmin && (
          <button onClick={() => { setEditingTask(null); setIsModalOpen(true); }} className="btn-primary">
            <Plus className="w-5 h-5" />
            Create Task
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-8 flex flex-wrap items-center gap-6">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="input-field pl-10"
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select 
              className="bg-slate-50 border-none text-sm font-semibold text-slate-600 rounded-lg px-3 py-2 focus:ring-0 cursor-pointer"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All Status</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <select 
            className="bg-slate-50 border-none text-sm font-semibold text-slate-600 rounded-lg px-3 py-2 focus:ring-0 cursor-pointer"
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
          >
            <option value="all">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-8 py-4">Task Name</th>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Assignee</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTasks.map((task) => (
                <tr 
                  key={task._id} 
                  className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                  onClick={() => {
                    if (isAdmin || task.assignee?._id === user.id) {
                      setEditingTask(task);
                      setIsModalOpen(true);
                    }
                  }}
                >
                  <td className="px-8 py-5">
                    <div className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                      {task.title}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      {task.project?.name}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-[10px] font-bold text-primary-700">
                        {task.assignee?.name?.[0]}
                      </div>
                      <span className="text-sm text-slate-700">{task.assignee?.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      task.priority === 'High' ? 'bg-rose-50 text-rose-600' :
                      task.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <select 
                      className={`text-xs font-bold rounded-full px-3 py-1.5 border-none focus:ring-0 cursor-pointer ${
                        task.status === 'Done' ? 'bg-emerald-50 text-emerald-600' :
                        task.status === 'In Progress' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-600'
                      }`}
                      value={task.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                      disabled={!isAdmin && task.assignee?._id !== user.id}
                    >
                      <option value="Todo">Todo</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="text-sm font-medium text-slate-600 flex items-center justify-end gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTasks.length === 0 && !loading && (
            <div className="py-20 text-center">
              <p className="text-slate-500">No tasks found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingTask(null); }}
        onSave={handleSave}
        task={editingTask}
        projects={projects}
        members={members}
      />
    </div>
  );
};

export default Tasks;
