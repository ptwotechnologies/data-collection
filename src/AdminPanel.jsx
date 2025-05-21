import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  FileSpreadsheet,
  Database,
  LogOut,
  BarChart2,
  Settings,
  Activity,
  Calendar,
} from 'lucide-react';
import AdminLayout from './AdminLayout';

const AdminPanel = ({ children, handleLogout: externalHandleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState({
    totalUsers: 0,
    ramaniBoys: 0,
    ramaniGirls: 0,
    newRegistrations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching dashboard data
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // This would be an actual API call in a real application
        // const response = await axiosInstance.get('/admin/dashboard');
        // setStats(response.data);

        // Simulated data
        setTimeout(() => {
          setStats({
            totalUsers: 256,
            ramaniBoys: 124,
            ramaniGirls: 132,
            newRegistrations: 18,
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    // Only fetch dashboard data when on the main admin route
    if (location.pathname === '/admin') {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    if (externalHandleLogout) {
      externalHandleLogout();
    } else {
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  // If this component is being used as a layout, return children wrapped in the layout
  if (children) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-[#0f051d] to-[#280f40]">
        <Sidebar location={location} />
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    );
  }

  // Otherwise, render the admin dashboard
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f051d] to-[#280f40]">
      <Sidebar location={location} />
      <div className="flex-1 flex flex-col">
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-20 bg-[#1e0d24] border-b border-purple-800/30 flex items-center justify-between px-6"
        >
          <h2 className="text-xl font-semibold text-amber-100">Dashboard</h2>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {}} // This would open settings in a real app
              className="p-2 text-amber-100 hover:bg-[#2a1533] rounded-lg transition-colors"
            >
              <Settings size={20} />
            </button>
            <div className="h-8 w-8 rounded-full bg-amber-400 flex items-center justify-center text-[#1e0d24] font-bold">
              A
            </div>
          </div>
        </motion.header>

        <main className="flex-1 p-6 overflow-auto">
          {/* Welcome Banner */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 bg-gradient-to-r from-purple-900/30 to-amber-900/30 rounded-lg p-6 border border-amber-500/20"
          >
            <h1 className="text-2xl font-bold text-amber-200 mb-2">
              Welcome to Admin Dashboard
            </h1>
            <p className="text-amber-100">
              Manage users, view analytics, and administer your platform from
              this central hub.
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

// Helper Components
const Sidebar = ({ location }) => (
  <motion.aside
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="w-20 lg:w-64 bg-gradient-to-b from-[#1e0d24] to-[#3a1d44] text-amber-100 flex flex-col"
  >
    <div className="h-20 flex items-center justify-center lg:justify-start px-4 border-b border-purple-800/30">
      <h1 className="text-2xl font-bold hidden lg:block text-amber-200">
        Admin Portal
      </h1>
      <Database className="lg:hidden text-amber-200" size={30} />
    </div>

    <nav className="flex-1 py-6 flex flex-col gap-2">
      <a href="/admin">
        <button
          className={`flex items-center px-4 py-3 w-full text-amber-100 ${
            location.pathname === '/admin'
              ? 'bg-purple-900/30 border-r-4 border-amber-400 text-amber-200'
              : 'hover:bg-purple-900/30 hover:text-amber-200 transition-colors'
          }`}
        >
          <BarChart2 size={20} className="mr-3" />
          <span className="hidden lg:inline">Dashboard</span>
        </button>
      </a>

      <a href="/admin/ramani-girls">
        <button
          className={`flex items-center px-4 py-3 w-full text-amber-100 ${
            location.pathname === '/admin/ramani-girls'
              ? 'bg-purple-900/30 border-r-4 border-amber-400 text-amber-200'
              : 'hover:bg-purple-900/30 hover:text-amber-200 transition-colors'
          }`}
        >
          <FileSpreadsheet size={20} className="mr-3" />
          <span className="hidden lg:inline">Ramani Girls</span>
        </button>
      </a>

      <a href="/admin/ramani-boys">
        <button
          className={`flex items-center px-4 py-3 w-full text-amber-100 ${
            location.pathname === '/admin/ramani-boys'
              ? 'bg-purple-900/30 border-r-4 border-amber-400 text-amber-200'
              : 'hover:bg-purple-900/30 hover:text-amber-200 transition-colors'
          }`}
        >
          <Database size={20} className="mr-3" />
          <span className="hidden lg:inline">Ramani Boys</span>
        </button>
      </a>

      <a href="/admin/users">
        <button
          className={`flex items-center px-4 py-3 w-full text-amber-100 ${
            location.pathname === '/admin/users'
              ? 'bg-purple-900/30 border-r-4 border-amber-400 text-amber-200'
              : 'hover:bg-purple-900/30 hover:text-amber-200 transition-colors'
          }`}
        >
          <Users size={20} className="mr-3" />
          <span className="hidden lg:inline">Users</span>
        </button>
      </a>
    </nav>

    <div className="p-4 border-t border-purple-800/30">
      <button
        className="flex items-center px-4 py-3 text-amber-100 hover:bg-purple-900/30 hover:text-amber-200 transition-colors w-full"
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/';
        }}
      >
        <LogOut size={20} className="mr-3" />
        <span className="hidden lg:inline">Logout</span>
      </button>
    </div>
  </motion.aside>
);

const StatCard = ({ title, value, subtitle, icon, color, highlight }) => (
  <div
    className={`bg-gradient-to-br ${color} rounded-lg p-5 border border-purple-700/30`}
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-sm font-medium text-amber-100/80">{title}</h3>
        <p className={`text-2xl font-bold mt-1 ${highlight}`}>
          {value.toLocaleString()}
        </p>
        {subtitle && (
          <p className="text-xs text-amber-100/60 mt-1">{subtitle}</p>
        )}
      </div>
      <div className="p-2 bg-[#1e0d24]/50 rounded-lg text-amber-300">
        {icon}
      </div>
    </div>
  </div>
);

const ActivityItem = ({ title, description, time, icon, iconColor }) => (
  <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg">
    <div className={`p-2 rounded-full ${iconColor}`}>{icon}</div>
    <div className="flex-1">
      <h4 className="text-amber-200 font-medium">{title}</h4>
      <p className="text-amber-100/70 text-sm">{description}</p>
    </div>
    <div className="text-amber-100/50 text-xs whitespace-nowrap">{time}</div>
  </div>
);

const QuickAccessCard = ({ title, icon, onClick }) => (
  <button
    onClick={onClick}
    className="p-4 bg-purple-900/20 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-purple-900/30 transition-colors"
  >
    <div className="text-amber-300">{icon}</div>
    <span className="text-sm text-amber-100">{title}</span>
  </button>
);

// Import these from lucide-react at the top of your file
const Edit = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const Trash2 = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export default AdminPanel;
