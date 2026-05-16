import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Briefcase, CheckSquare, Users,
  LogOut, Bell, Search, ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  const navItems = [
    { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/app/projects', icon: Briefcase },
    { name: 'Tasks', path: '/app/tasks', icon: CheckSquare },
  ];
  if (isAdmin) navItems.push({ name: 'Members', path: '/app/members', icon: Users });

  return (
    <aside className="w-60 h-screen fixed left-0 top-0 flex flex-col z-20"
      style={{ background: 'rgba(5,12,5,0.98)', borderRight: '1px solid rgba(34,197,94,0.1)' }}>

      {/* Logo */}
      <div className="px-6 py-6 flex items-center gap-2.5">
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <CheckSquare className="w-5 h-5 text-black" />
        </div>
        <span className="text-lg font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>TaskFlow</span>
      </div>

      <div className="px-3 mb-2">
        <p className="text-[10px] font-bold tracking-widest uppercase text-green-900 px-3 mb-2">Navigation</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'text-green-300/40 hover:text-green-300 hover:bg-green-900/20'
              }`
            }
          >
            <item.icon className="w-4.5 h-4.5 flex-shrink-0" style={{width:'18px', height:'18px'}} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-green-900/30">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg mb-1"
          style={{ background: 'rgba(34,197,94,0.05)' }}>
          <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center font-bold text-green-400 text-sm flex-shrink-0">
            {user?.name?.[0].toUpperCase()}
          </div>
          <div className="overflow-hidden flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
            <p className="text-xs text-green-400/40 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-green-300/40 hover:text-red-400 hover:bg-red-900/10 transition-all duration-200"
        >
          <LogOut style={{width:'16px', height:'16px'}} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

const Header = () => (
  <header
    className="h-14 sticky top-0 z-10 px-6 flex items-center justify-between"
    style={{ background: 'rgba(5,10,5,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(34,197,94,0.08)' }}
  >
    <div className="flex items-center gap-3 rounded-lg px-3 py-1.5 w-80"
      style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.1)' }}>
      <Search style={{width:'14px', height:'14px', color:'rgba(34,197,94,0.4)'}} />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent border-none outline-none text-sm w-full"
        style={{ color: 'rgba(240,253,244,0.6)' }}
      />
    </div>
    <button className="relative p-2 rounded-lg transition-colors hover:bg-green-900/20">
      <Bell style={{width:'18px', height:'18px', color:'rgba(34,197,94,0.5)'}} />
      <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-green-500 rounded-full" />
    </button>
  </header>
);

const Layout = () => (
  <div className="gradient-bg min-h-screen">
    <Sidebar />
    <div className="pl-60">
      <Header />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;
