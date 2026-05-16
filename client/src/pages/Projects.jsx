import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { 
  Plus, 
  Calendar, 
  Users, 
  MoreVertical,
  ExternalLink,
  MessageSquareCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard = ({ project, onEdit, onDelete, isAdmin }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group relative"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xl">
        {project.name[0]}
      </div>
      {isAdmin && (
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      )}
    </div>
    
    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
      {project.name}
    </h3>
    <p className="text-slate-500 text-sm mt-2 line-clamp-2 min-h-[40px]">
      {project.description || 'No description provided.'}
    </p>

    <div className="mt-6 flex items-center justify-between">
      <div className="flex -space-x-2">
        {project.members?.slice(0, 3).map((m, i) => (
          <div 
            key={m._id} 
            className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold"
            title={m.name}
          >
            {m.name[0]}
          </div>
        ))}
        {project.members?.length > 3 && (
          <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
            +{project.members.length - 3}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1 rounded-lg">
        <Calendar className="w-3.5 h-3.5" />
        {new Date(project.deadline).toLocaleDateString()}
      </div>
    </div>

    <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
        project.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
      }`}>
        {project.status}
      </span>
      <button className="text-primary-600 text-sm font-bold flex items-center gap-1 hover:underline">
        Open Details <ExternalLink className="w-3.5 h-3.5" />
      </button>
    </div>
  </motion.div>
);

const ProjectModal = ({ isOpen, onClose, onSave, project = null, members = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadline: '',
    members: [],
    status: 'active'
  });

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        deadline: project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : '',
        members: project.members?.map(m => m._id) || []
      });
    } else {
      setFormData({ name: '', description: '', deadline: '', members: [], status: 'active' });
    }
  }, [project]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            {project ? 'Edit Project' : 'New Project'}
          </h3>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
            <div>
              <label className="label">Project Name</label>
              <input 
                type="text" 
                className="input-field" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea 
                className="input-field min-h-[100px]" 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Deadline</label>
                <input 
                  type="date" 
                  className="input-field" 
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="label">Status</label>
                <select 
                  className="input-field appearance-none"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label">Team Members</label>
              <div className="max-h-32 overflow-y-auto border border-slate-200 rounded-xl p-2 grid grid-cols-2 gap-2">
                {members.map(m => (
                  <label key={m._id} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer text-sm">
                    <input 
                      type="checkbox" 
                      checked={formData.members.includes(m._id)}
                      onChange={(e) => {
                        const newMembers = e.target.checked 
                          ? [...formData.members, m._id]
                          : formData.members.filter(id => id !== m._id);
                        setFormData({...formData, members: newMembers});
                      }}
                      className="rounded text-primary-600 focus:ring-primary-500"
                    />
                    {m.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button type="button" onClick={onClose} className="flex-1 btn-secondary">Cancel</button>
              <button type="submit" className="flex-1 btn-primary">Save Project</button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, membersRes] = await Promise.all([
          api.get('/projects'),
          isAdmin ? api.get('/auth/members') : Promise.resolve({ data: [] })
        ]);
        setProjects(projectsRes.data);
        setMembers(membersRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAdmin]);

  const handleSave = async (formData) => {
    try {
      if (formData._id) {
        await api.put(`/projects/${formData._id}`, formData);
      } else {
        await api.post('/projects', formData);
      }
      const res = await api.get('/projects');
      setProjects(res.data);
      setIsModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving project');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
          <p className="text-slate-500">Manage and track your active projects.</p>
        </div>
        {isAdmin && (
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">
            <Plus className="w-5 h-5" />
            Create Project
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map(project => (
          <ProjectCard 
            key={project._id} 
            project={project} 
            isAdmin={isAdmin}
          />
        ))}
        {projects.length === 0 && !loading && (
          <div className="col-span-full py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No projects yet</h3>
            <p className="text-slate-500 mt-2">Get started by creating your first project.</p>
          </div>
        )}
      </div>

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave}
        members={members}
      />
    </div>
  );
};

export default Projects;
