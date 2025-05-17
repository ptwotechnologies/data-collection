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
      navigate('/'); // Or trigger your login modal
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
    <div className="relative min-h-screen w-full  bg-cover bg-center bg-no-repeat">
      {/* Banner Section */}
      <div
        className="relative min-h-screen w-full flex flex-col items-center justify-center text-center p-4 md:p-8"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlend: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-opacity-70"></div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold text-amber-600 mb-4 md:mb-6"
          >
            Welcome to Our Spiritual Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-amber-200 font-bold mb-6 md:mb-8 max-w-2xl mx-auto"
          >
            Join our community of devotees and explore the path to spiritual
            enlightenment. Register to receive updates on events, rituals, and
            gatherings.
          </motion.p>

          {/* Responsive button layout - grid for mobile, flex for desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row md:justify-center gap-3 md:gap-4 w-full max-w-3xl mx-auto">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenRegister}
              className="px-4 md:px-8 cursor-pointer py-3 bg-amber-500 hover:bg-amber-600 text-[#2a1533] font-bold rounded-lg shadow-lg"
            >
              Register Now
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate('/certificate');
              }}
              className="px-4 md:px-8 cursor-pointer py-3 bg-amber-500 hover:bg-amber-600 text-[#2a1533] font-bold rounded-lg shadow-lg"
            >
              Download Form
            </motion.button>

            {/* Get Married dropdown container */}
            <div className="relative w-full sm:w-auto">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMarriageOptions(!showMarriageOptions)}
                onMouseEnter={() => setShowMarriageOptions(true)}
                onMouseLeave={() => setShowMarriageOptions(false)}
                className="w-full px-4 md:px-8 cursor-pointer py-3 bg-amber-500 hover:bg-amber-600 text-[#2a1533] font-bold rounded-lg shadow-lg"
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
                      className="w-full py-2 bg-pink-400 hover:bg-pink-500 text-white font-medium rounded-t-md shadow-md"
                    >
                      Register as Female
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleRegisterAsBoy}
                      className="w-full py-2 bg-purple-400 hover:bg-purple-500 text-white font-medium rounded-b-md shadow-md"
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
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleClick();
                handleOpenLogin();
              }}
              className="px-4 md:px-8 cursor-pointer py-3 bg-amber-500 hover:bg-amber-600 text-[#2a1533] font-bold rounded-lg shadow-lg"
            >
              {isAdminLoggedIn ? 'Go to Dashboard' : 'Admin Sign In'}
            </motion.button>
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
