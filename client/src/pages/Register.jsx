import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, Mail, Lock, User, UserCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'member' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      navigate('/app/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>TaskFlow</span>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>Create account</h1>
          <p style={{ color: 'rgba(134,239,172,0.5)', fontSize: '0.9rem' }}>Join your team on TaskFlow</p>
        </div>

        <div className="glass-card p-8">
          {error && (
            <div className="mb-5 p-3.5 rounded-lg text-sm"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(34,197,94,0.4)' }} />
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  className="input-field pl-10" placeholder="John Doe" required />
              </div>
            </div>

            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(34,197,94,0.4)' }} />
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  className="input-field pl-10" placeholder="you@company.com" required />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(34,197,94,0.4)' }} />
                <input type="password" name="password" value={formData.password} onChange={handleChange}
                  className="input-field pl-10" placeholder="••••••••" required />
              </div>
            </div>

            <div>
              <label className="label">Role</label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(34,197,94,0.4)' }} />
                <select name="role" value={formData.role} onChange={handleChange}
                  className="input-field pl-10 appearance-none">
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm font-bold mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <>Create Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-sm" style={{ color: 'rgba(134,239,172,0.4)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#22c55e', fontWeight: 600 }} className="hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
