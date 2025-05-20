import React from 'react';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RegisterModal from './RegisterModal';
import LoginForm from './LoginForm';
import bannerImage from './assets/banner.jpg';

import { useNavigate } from 'react-router-dom';
export default function ReligiousPortal() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showMarriageOptions, setShowMarriageOptions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAdminLoggedIn(!!token); // true if token exists
  }, []);

  const handleClick = () => {
    if (isAdminLoggedIn) {
      navigate('/admin');
    } else {
      handleOpenLogin();
    }
  };

  const handleOpenRegister = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleRegisterAsBoy = () => {
    navigate('/boy-form');
  };

  const handleRegisterAsGirl = () => {
    navigate('/girl-form');
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Desktop Layout (Side by side) */}
      <div className="hidden md:flex min-h-screen w-full">
        {/* Banner Image - Left Side (40% width) */}
        <div
          className="w-2/5 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bannerImage})`,
            borderTopRightRadius: '3rem',
            borderBottomRightRadius: '3rem',
          }}
        />

        {/* Content - Right Side (60% width) */}
        <div className="w-3/5 flex items-center justify-center p-8 bg-gray-900">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-red-600 mb-6"
            >
              Welcome to Our Spiritual Journey
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-red-200 font-bold mb-8"
            >
              Join our community of devotees and explore the path to spiritual
              enlightenment. Register to receive updates on events, rituals, and
              gatherings.
            </motion.p>

            {/* Buttons - arranged in two columns */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenRegister}
                className="px-6 cursor-pointer py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg"
              >
                Register Now
              </motion.button>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate('/certificate');
                }}
                className="px-6 cursor-pointer py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg"
              >
                Download Form
              </motion.button>

              {/* Get Married dropdown container */}
              <div className="relative">
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMarriageOptions(!showMarriageOptions)}
                  onMouseEnter={() => setShowMarriageOptions(true)}
                  onMouseLeave={() => setShowMarriageOptions(false)}
                  className="w-full px-6 cursor-pointer py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg"
                >
                  Get Married
                </motion.button>

                {/* Dropdown options */}
                <AnimatePresence>
                  {showMarriageOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 right-0 mt-2 flex flex-col z-20"
                      onMouseEnter={() => setShowMarriageOptions(true)}
                      onMouseLeave={() => setShowMarriageOptions(false)}
                    >
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleRegisterAsGirl}
                        className="w-full py-2 bg-red-400 hover:bg-red-500 text-white font-medium rounded-t-md shadow-md"
                      >
                        Register as Female
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleRegisterAsBoy}
                        className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-b-md shadow-md"
                      >
                        Register as Male
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleClick();
                }}
                className="w-full px-6 cursor-pointer py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg"
              >
                {isAdminLoggedIn ? 'Go to Dashboard' : 'Admin Sign In'}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (Stack) */}
      <div className="md:hidden min-h-screen w-full flex flex-col">
        {/* Banner Image - Top (75% height) */}
        <div
          className="w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${bannerImage})`,
            height: '75vh',
            borderBottomLeftRadius: '3rem',
            borderBottomRightRadius: '3rem',
          }}
        />

        {/* Content - Bottom (25% height) */}
        <div className="flex-1 flex items-center justify-center p-4 bg-gray-900">
          <div className="w-full max-w-md">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-red-600 mb-4 text-center"
            >
              Welcome to Our Spiritual Journey
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-red-200 font-bold mb-6 text-center"
            >
              Join our community of devotees and explore the path to spiritual
              enlightenment.
            </motion.p>

            {/* Buttons in 2-column, 2-row grid */}
            <div className="grid grid-cols-2 gap-3 w-full">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenRegister}
                className="px-2 cursor-pointer py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg text-sm"
              >
                Register Now
              </motion.button>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate('/certificate');
                }}
                className="px-2 cursor-pointer py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg text-sm"
              >
                Download Form
              </motion.button>

              {/* Get Married dropdown container */}
              <div className="relative">
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMarriageOptions(!showMarriageOptions)}
                  className="w-full px-2 cursor-pointer py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg text-sm"
                >
                  Get Married
                </motion.button>

                {/* Dropdown options */}
                <AnimatePresence>
                  {showMarriageOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 right-0 mt-2 flex flex-col z-20"
                    >
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleRegisterAsGirl}
                        className="w-full py-2 bg-red-400 hover:bg-red-500 text-white font-medium rounded-t-md shadow-md text-xs"
                      >
                        Register as Female
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleRegisterAsBoy}
                        className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-b-md shadow-md text-xs"
                      >
                        Register as Male
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleClick();
                }}
                className="px-2 cursor-pointer py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg text-sm"
              >
                {isAdminLoggedIn ? 'Dashboard' : 'Admin Login'}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Forms */}
      <AnimatePresence>
        {isRegisterOpen && (
          <RegisterModal handleCloseModal={handleCloseRegister} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isLoginOpen && <LoginForm handleCloseLogin={handleCloseLogin} />}
      </AnimatePresence>
    </div>
  );
}
