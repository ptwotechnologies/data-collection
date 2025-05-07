import React from 'react';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

function RegisterModal({ handleCloseModal }) {
  const [statesData, setStatesData] = useState([]);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    jobType: '',
    jobRole: '',
    jobDescription: '',
    state: '',
    district: '',
    taluk: '',
  });

  // Fetch states and districts data from the JSON file in public folder
  useEffect(() => {
    const fetchStatesData = async () => {
      try {
        const response = await fetch('/states-and-districts.json');
        const data = await response.json();
        setStatesData(data.states || []);
      } catch (error) {
        console.error('Error fetching states data:', error);
      }
    };

    fetchStatesData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'state') {
      const stateData = statesData.find((s) => s.state === value);
      setAvailableDistricts(stateData ? stateData.districts : []);
      setFormData((prev) => ({
        ...prev,
        district: '',
        taluk: '',
      }));
    }

    if (name === 'district') {
      setFormData((prev) => ({
        ...prev,
        taluk: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: formData.name,
      phoneNumber: formData.phone,
      emailAddress: formData.email,
      jobType: formData.jobType,
      businessType: formData.jobRole,
      state: formData.state,
      district: formData.district,
      taluk: formData.taluk,
      jobDescription: formData.jobDescription,
    };

    try {
      const res = await fetch('http://localhost:8888/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to submit form');

      alert('Form submitted successfully!');
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form');
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdropVariants}
    >
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={handleCloseModal}
      ></motion.div>

      <motion.div
        className="relative bg-gradient-to-br from-[#1e0d24] to-[#3a1d44] rounded-xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden border border-purple-500/20"
        variants={modalVariants}
      >
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-purple-700/30">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-100">
            Registration Form
          </h2>
          <motion.button
            onClick={handleCloseModal}
            className="text-amber-200 hover:text-amber-100"
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto max-h-[80vh]">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label
                    htmlFor="name"
                    className="block text-amber-100 mb-1 sm:mb-2 font-medium"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#2a1533] text-amber-50 border border-purple-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <label
                    htmlFor="phone"
                    className="block text-amber-100 mb-1 sm:mb-2 font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#2a1533] text-amber-50 border border-purple-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-amber-100 mb-1 sm:mb-2 font-medium"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#2a1533] text-amber-50 border border-purple-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <label
                    htmlFor="jobType"
                    className="block text-amber-100 mb-1 sm:mb-2 font-medium"
                  >
                    Job Type
                  </label>
                  <select
                    id="jobType"
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#2a1533] text-amber-50 border border-purple-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="">Select Job Type</option>
                    <option value="government">Government</option>
                    <option value="private">Private</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <label
                    htmlFor="jobRole"
                    className="block text-amber-100 mb-1 sm:mb-2 font-medium"
                  >
                    Business Type
                  </label>
                  <select
                    id="jobRole"
                    name="jobRole"
                    value={formData.jobRole}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#2a1533] text-amber-50 border border-purple-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="">Select Business Type</option>
                    <option value="manufacture">Manufacture</option>
                    <option value="service">Service</option>
                  </select>
                </motion.div>
              </div>

              {/* Location and Job Description */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label
                    htmlFor="state"
                    className="block text-amber-100 mb-1 sm:mb-2 font-medium"
                  >
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#2a1533] text-amber-50 border border-purple-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="">Select State</option>
                    {statesData.map((stateData) => (
                      <option key={stateData.state} value={stateData.state}>
                        {stateData.state}
                      </option>
                    ))}
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <label
                    htmlFor="district"
                    className="block text-amber-100 mb-1 sm:mb-2 font-medium"
                  >
                    District
                  </label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    disabled={!formData.state}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#2a1533] text-amber-50 border border-purple-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select District</option>
                    {availableDistricts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <label
                    htmlFor="taluk"
                    className="block text-amber-100 mb-1 sm:mb-2 font-medium"
                  >
                    Taluk
                  </label>
                  <input
                    type="text"
                    id="taluk"
                    name="taluk"
                    value={formData.taluk}
                    onChange={handleChange}
                    required
                    disabled={!formData.district}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#2a1533] text-amber-50 border border-purple-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter taluk name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <label
                    htmlFor="jobDescription"
                    className="block text-amber-100 mb-1 sm:mb-2 font-medium"
                  >
                    Job Description
                  </label>
                  <textarea
                    id="jobDescription"
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#2a1533] text-amber-50 border border-purple-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                  ></textarea>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="mt-6 sm:mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-2 sm:py-3 bg-amber-500 hover:bg-amber-600 text-[#1e0d24] font-bold rounded-lg shadow-lg transition-all"
              >
                Submit Registration
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default RegisterModal;
