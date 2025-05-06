import React from 'react';
import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RegisterModal from './RegisterModal';
import LoginForm from './LoginForm';

export default function ReligiousPortal() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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

  return (
    <div className="relative min-h-screen w-full bg-[#2a1533]">
      {/* Banner Section */}
      <div
        className="relative min-h-screen w-full flex flex-col items-center justify-center text-center p-8"
        style={{
          backgroundImage: "url('/api/placeholder/1920/1080')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlend: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-[#2a1533] bg-opacity-70"></div>

        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-amber-100 mb-6"
          >
            Welcome to Our Spiritual Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-amber-50 mb-8 max-w-2xl mx-auto"
          >
            Join our community of devotees and explore the path to spiritual
            enlightenment. Register to receive updates on events, rituals, and
            gatherings.
          </motion.p>
          <div className="flex justify-center space-x-4 ">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenRegister}
              className="px-8 cursor-pointer py-3 bg-amber-500 hover:bg-amber-600 text-[#2a1533] font-bold rounded-lg shadow-lg"
            >
              Register Now
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenLogin}
              className="px-8 cursor-pointer py-3 bg-amber-500 hover:bg-amber-600 text-[#2a1533] font-bold rounded-lg shadow-lg"
            >
              Sign In
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
