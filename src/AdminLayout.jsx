import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  FileSpreadsheet,
  Database,
  LogOut,
  BarChart2,
} from 'lucide-react';

const AdminLayout = ({ children, handleLogout }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f051d] to-[#280f40]">
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
          <Link to="/admin">
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
          </Link>

          <Link to="/admin/users">
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
          </Link>

          <Link to="/admin/ramani-girls">
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
          </Link>

          <Link to="/admin/ramani-boys">
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
          </Link>
        </nav>

        <div className="p-4 border-t border-purple-800/30">
          <button
            className="flex items-center px-4 py-3 text-amber-100 hover:bg-purple-900/30 hover:text-amber-200 transition-colors w-full"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-3" />
            <span className="hidden lg:inline">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
};

export default AdminLayout;
