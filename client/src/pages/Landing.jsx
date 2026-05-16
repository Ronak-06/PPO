import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckSquare, ArrowRight, Zap, Shield, Users, 
  BarChart3, CheckCircle2, Star, ChevronRight
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Manage tasks in real-time with instant updates across your entire team.',
  },
  {
    icon: Shield,
    title: 'Role-Based Access',
    desc: 'Fine-grained admin and member permissions to keep your workflow secure.',
  },
  {
    icon: BarChart3,
    title: 'Smart Dashboard',
    desc: 'Visualize project health, deadlines, and team productivity at a glance.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    desc: 'Assign tasks, track progress, and align your team around shared goals.',
  },
];

const stats = [
  { value: '10x', label: 'Faster Delivery' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '50+', label: 'Integrations' },
  { value: '24/7', label: 'Support' },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Engineering Lead',
    text: 'TaskFlow transformed how our team manages sprints. The green dashboard is genuinely beautiful.',
    avatar: 'S',
  },
  {
    name: 'Marcus Webb',
    role: 'Product Manager',
    text: 'Finally a task manager that looks as powerful as it works. Our delivery rate improved 40%.',
    avatar: 'M',
  },
  {
    name: 'Priya Sharma',
    role: 'CTO',
    text: 'The role-based access and real-time updates make this indispensable for our distributed team.',
    avatar: 'P',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
};

const Landing = () => {
  return (
    <div className="gradient-bg min-h-screen font-['Inter']">

      {/* ── Navbar ── */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold text-white font-['Space_Grotesk']">TaskFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-green-300/70 hover:text-green-400 transition-colors">Features</a>
          <a href="#stats" className="text-sm text-green-300/70 hover:text-green-400 transition-colors">Stats</a>
          <a href="#testimonials" className="text-sm text-green-300/70 hover:text-green-400 transition-colors">Reviews</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-ghost text-sm">Sign In</Link>
          <Link to="/register" className="btn-primary text-sm">Get Started →</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="text-center px-6 pt-20 pb-28 max-w-5xl mx-auto relative">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <div className="hero-badge">
            <Star className="w-3.5 h-3.5" />
            Trusted by 500+ teams worldwide
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-none"
          initial="hidden" animate="show" custom={1} variants={fadeUp}
          style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
        >
          Manage Teams.{' '}
          <span className="glow-text">Ship Faster.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-green-200/60 max-w-2xl mx-auto mb-10"
          initial="hidden" animate="show" custom={2} variants={fadeUp}
        >
          TaskFlow gives engineering and product teams a single source of truth for projects, tasks, 
          and priorities — wrapped in a blazing-fast, gorgeous interface.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial="hidden" animate="show" custom={3} variants={fadeUp}
        >
          <Link
            to="/register"
            className="btn-primary py-4 px-8 text-base font-bold animate-pulse-glow"
          >
            Start Free Today
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/login" className="btn-secondary py-4 px-8 text-base">
            Sign In to Dashboard
          </Link>
        </motion.div>

        {/* ── Dashboard preview card ── */}
        <motion.div
          className="mt-20 glass-card p-1 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
        >
          <div className="rounded-[0.875rem] overflow-hidden bg-[#080f08] p-6">
            {/* Fake dashboard preview */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="flex-1 ml-4 h-5 bg-green-900/30 rounded-md" />
            </div>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {['Total Tasks', 'Completed', 'In Progress', 'Overdue'].map((label, i) => (
                <div key={label} className="stat-card p-3">
                  <p className="text-[10px] text-green-400/50 mb-1">{label}</p>
                  <p className="text-xl font-bold text-green-400">{['24', '18', '4', '2'][i]}</p>
                </div>
              ))}
            </div>
            <div className="glass-card p-3 space-y-2">
              {['Design system update', 'API integration', 'User testing'].map((task, i) => (
                <div key={task} className="flex items-center gap-3 py-1">
                  <div className={`w-2 h-2 rounded-full ${['bg-green-400', 'bg-yellow-400', 'bg-purple-400'][i]}`} />
                  <span className="text-xs text-green-200/60">{task}</span>
                  <span className="ml-auto text-[10px] badge-green">{['Done', 'Active', 'Review'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section id="stats" className="py-16 border-t border-green-900/30">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial="hidden" whileInView="show" custom={i} variants={fadeUp} viewport={{ once: true }}
            >
              <p className="text-4xl font-black glow-text mb-1" style={{ fontFamily: 'Space Grotesk' }}>{s.value}</p>
              <p className="text-sm text-green-300/50">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}
        >
          <div className="hero-badge mb-4">Features</div>
          <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>
            Everything your team needs
          </h2>
          <p className="text-green-200/50 mt-4 max-w-xl mx-auto">
            Purpose-built tools that help teams plan, track, and ship work faster.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="glass-card-hover p-8 flex gap-5"
              initial="hidden" whileInView="show" custom={i} variants={fadeUp} viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                <f.icon className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-green-200/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}
        >
          <div className="hero-badge mb-4">Testimonials</div>
          <h2 className="text-4xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>
            Loved by teams that ship
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="glass-card p-6"
              initial="hidden" whileInView="show" custom={i} variants={fadeUp} viewport={{ once: true }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-green-400 fill-green-400" />
                ))}
              </div>
              <p className="text-green-200/70 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center font-bold text-green-400 text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-green-400/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center glass-card p-16 relative overflow-hidden"
          initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />
          <div className="hero-badge mb-6">Get Started Today</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Ready to <span className="glow-text">ship faster?</span>
          </h2>
          <p className="text-green-200/50 mb-8">
            Join hundreds of teams already using TaskFlow to manage their work smarter.
          </p>
          <Link to="/register" className="btn-primary py-4 px-10 text-base font-bold animate-pulse-glow">
            Create Free Account
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-green-900/30 py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckSquare className="w-5 h-5 text-green-400" />
          <span className="font-bold text-white">TaskFlow</span>
        </div>
        <p className="text-xs text-green-400/30">© 2024 TaskFlow. Built for high-performance teams.</p>
      </footer>
    </div>
  );
};

export default Landing;
