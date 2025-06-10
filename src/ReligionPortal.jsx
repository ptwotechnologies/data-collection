import React from 'react';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RegisterModal from './RegisterModal';
import LoginForm from './LoginForm';
import bannerImage from './assets/banner.webp';

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
    <div className="relative h-screen w-full bg-red-50 overflow-hidden">
      {/* Desktop Layout (Side by side) */}
      <div className="hidden md:flex h-screen w-full">
        {/* Banner Image - Left Side (40% width) - OPTIMIZED FOR LCP */}
        <div className="w-2/5 h-full relative overflow-hidden rounded-tr-3xl rounded-br-3xl">
          <img
            src={bannerImage}
            alt="Spiritual Journey Banner"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => {
              // Optional: Track LCP improvement
              console.log('Banner image loaded');
            }}
          />
        </div>

        {/* Content - Right Side (60% width) */}
        <div className="w-3/5 flex items-center justify-center p-8 bg-red-50">
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
              className="text-xl text-gray-700 font-bold mb-8"
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

      {/* Mobile Layout (Stack) - SOLUTION 2: Scrollable content */}
      <div className="md:hidden min-h-screen w-full flex flex-col">
        {/* Banner Image - Top (50% height) */}
        <div
          className="w-full relative overflow-hidden rounded-bl-3xl rounded-br-3xl flex-shrink-0"
          style={{ height: '50vh' }}
        >
          <img
            src={bannerImage}
            alt="Spiritual Journey Banner"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => {
              console.log('Mobile banner image loaded');
            }}
          />
        </div>

        {/* Content - Bottom (scrollable) */}
        <div className="flex-1 bg-red-50 overflow-y-auto">
          <div className="p-4">
            <div className="w-full max-w-md mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-2xl font-bold text-red-600 mb-4 text-center"
              >
                Welcome to Our Spiritual Journey
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm text-gray-700 font-bold mb-6 text-center leading-relaxed"
              >
                Join our community of devotees and explore the path to spiritual
                enlightenment. Register to receive updates on events, rituals,
                and gatherings.
              </motion.p>

              {/* Buttons in 2-column, 2-row grid with generous spacing */}
              <div className="grid grid-cols-2 gap-4 w-full mb-8">
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenRegister}
                  className="px-4 cursor-pointer py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg text-sm"
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
                  className="px-4 cursor-pointer py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg text-sm"
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
                    className="w-full px-4 cursor-pointer py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg text-sm"
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
                          className="w-full py-3 bg-red-400 hover:bg-red-500 text-white font-medium rounded-t-md shadow-md text-sm"
                        >
                          Register as Female
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleRegisterAsBoy}
                          className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-b-md shadow-md text-sm"
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
                  className="px-4 cursor-pointer py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg text-sm"
                >
                  {isAdminLoggedIn ? 'Dashboard' : 'Admin Login'}
                </motion.button>
              </div>
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
