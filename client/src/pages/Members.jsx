import { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  Users, 
  Mail, 
  Shield, 
  MoreVertical,
  Search,
  UserPlus,
  BadgeCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const MemberCard = ({ member }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group"
  >
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 text-xl font-bold">
        {member.name[0]}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
          {member.role === 'admin' && <BadgeCheck className="w-4 h-4 text-primary-500" />}
        </div>
        <div className="flex items-center gap-4 mt-1">
          <div className="flex items-center gap-1.5 text-slate-500 text-sm">
            <Mail className="w-3.5 h-3.5" />
            {member.email}
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 text-sm">
            <Shield className="w-3.5 h-3.5" />
            <span className="capitalize">{member.role}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div className="flex items-center gap-4">
      <div className="hidden md:block text-right">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Joined On</p>
        <p className="text-sm font-semibold text-slate-700">{new Date(member.createdAt).toLocaleDateString()}</p>
      </div>
      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
  </motion.div>
);

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get('/auth/members');
        setMembers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Team Members</h2>
          <p className="text-slate-500">Manage your team and their access levels.</p>
        </div>
        <button className="btn-primary">
          <UserPlus className="w-5 h-5" />
          Invite Member
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="input-field pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredMembers.map(member => (
          <MemberCard key={member._id} member={member} />
        ))}
        {filteredMembers.length === 0 && !loading && (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-100 border-dashed">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900">No members found</h3>
            <p className="text-slate-500 mt-2">Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
