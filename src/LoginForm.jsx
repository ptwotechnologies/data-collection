import React, { useState } from 'react';
import { X, User, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../src/context/axiosInstance'
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
  exit: { y: 50, opacity: 0 },
};

function LoginForm({ handleCloseLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post('/admin/login', formData); 
      console.log("REponse data" , response)
      const { token } = response.data;

      // On successful login, store the token and navigate
      localStorage.setItem('token', token);
      setLoginSuccess(true);
      setTimeout(() => {
        handleCloseLogin();
        navigate('/admin');
      }, 1500);
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.error || 'Login failed. Please try again.');
      } else {
        setError('Server error. Please try again later.');
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdropVariants}
    >
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={handleCloseLogin}
      ></motion.div>

      <motion.div
        className="relative bg-gradient-to-br from-[#1e0d24] to-[#3a1d44] rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-purple-500/20"
        variants={modalVariants}
      >
        <div className="flex justify-between items-center p-6 border-b border-purple-700/30">
          <h2 className="text-2xl font-bold text-amber-100">Admin Login</h2>
          <motion.button
            onClick={handleCloseLogin}
            className="text-amber-200 hover:text-amber-100"
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="email" className="block text-amber-100 mb-2 font-medium">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={18} className="text-purple-300" />
                  </div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 px-4 py-3 rounded-lg bg-[#2a1533] text-amber-50 border border-purple-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <label htmlFor="password" className="block text-amber-100 mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock size={18} className="text-purple-300" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 px-4 py-3 rounded-lg bg-[#2a1533] text-amber-50 border border-purple-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                  />
                </div>
              </motion.div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-center mt-2"
                >
                  {error}
                </motion.p>
              )}

              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {loginSuccess ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg"
                  >
                    Login successful! Redirecting...
                  </motion.div>
                ) : (
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                    className={`px-8 py-3 ${loading ? 'bg-gray-400' : 'bg-amber-500'} hover:bg-amber-600 text-[#1e0d24] font-bold rounded-lg shadow-lg transition-all w-full`}
                  >
                    {loading ? 'Logging In...' : 'Admin Sign In'}
                  </motion.button>
                )}
              </motion.div>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LoginForm;
