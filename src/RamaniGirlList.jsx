import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, Edit, Trash2, Grid, List } from 'lucide-react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import axiosInstance from './context/axiosInstance';
import AdminLayout from './AdminPanel';
import GirlDetailsCard from './GirlDetailsCard';

const RamaniGirlList = () => {
  const navigate = useNavigate();
  const [girls, setGirls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGirls, setFilteredGirls] = useState([]);
  const [selectedGirl, setSelectedGirl] = useState(null);
  const [showGirlDetails, setShowGirlDetails] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: '',
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGirls = filteredGirls?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = filteredGirls?.length
    ? Math.ceil(filteredGirls.length / itemsPerPage)
    : 0;

  // Fetch data from API
  useEffect(() => {
    const fetchGirls = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get('/girl/all');

        // Handle different response formats
        const girlsArray = Array.isArray(response.data?.data)
          ? response.data.data
          : Array.isArray(response.data)
          ? response.data
          : [];

        setGirls(girlsArray);
        setFilteredGirls(girlsArray);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || err.message);
        toast.error('Failed to load data');
        setGirls([]);
        setFilteredGirls([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGirls();
  }, []);

  // Search functionality
  useEffect(() => {
    try {
      if (searchTerm.trim() === '') {
        setFilteredGirls(girls);
      } else {
        const filtered = girls.filter((girl) => {
          if (!girl) return false;

          const searchLower = searchTerm.toLowerCase();
          return (
            (girl.girlName &&
              girl.girlName.toLowerCase().includes(searchLower)) ||
            (girl.girlFatherName &&
              girl.girlFatherName.toLowerCase().includes(searchLower)) ||
            (girl.mobileNumber && girl.mobileNumber.includes(searchTerm)) ||
            (girl.district &&
              girl.district.toLowerCase().includes(searchLower)) ||
            (girl.state && girl.state.toLowerCase().includes(searchLower))
          );
        });
        setFilteredGirls(filtered);
      }
    } catch (err) {
      console.error('Error in search filter:', err);
      setFilteredGirls([]);
    }
  }, [searchTerm, girls]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Handle girl selection
  const handleGirlSelect = (girl) => {
    setSelectedGirl(girl);
    setShowGirlDetails(true);
  };

  // Handle girl deletion
  const handleDeleteGirl = async (girlId) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    try {
      await axiosInstance.delete(`/girl/${girlId}`);

      // Update state optimistically
      setGirls((prev) => prev.filter((girl) => girl._id !== girlId));
      setFilteredGirls((prev) => prev.filter((girl) => girl._id !== girlId));

      // Clear selection if needed
      if (selectedGirl && selectedGirl._id === girlId) {
        setSelectedGirl(null);
        setShowGirlDetails(false);
      }

      showNotification('Record deleted successfully');
    } catch (error) {
      toast.error('Failed to delete record');
      console.error('Delete Error:', error.response?.data || error.message);
    }
  };

  // Handle girl edit
  const handleEditGirl = (girlId) => {
    console.log('Edit girl with ID:', girlId);
    // Navigate to edit page or open edit modal
  };

  // Export to CSV
  const exportToCSV = () => {
    setLoading(true);

    setTimeout(() => {
      try {
        const csv = Papa.unparse(
          filteredGirls.map((girl) => ({
            Name: girl.girlName || '',
            "Father's Name": girl.girlFatherName || '',
            "Mother's Name": girl.girlMotherName || '',
            Mobile: girl.mobileNumber || '',
            District: girl.district || '',
            State: girl.state || '',
            'Already Married': girl.isAlreadyMarried || '',
            DOB: girl.girlDOB || '',
          }))
        );

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.setAttribute('href', url);
        link.setAttribute(
          'download',
          `ramani_girls_${new Date().toISOString().split('T')[0]}.csv`
        );
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setLoading(false);
        showNotification('CSV exported successfully');
      } catch (err) {
        console.error('Error exporting CSV:', err);
        toast.error('Failed to export CSV');
        setLoading(false);
      }
    }, 1000);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Close details panel
  const closeDetailsPanel = () => {
    setShowGirlDetails(false);
  };

  // Calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return 'N/A';

    try {
      // Parse the date string - handle different formats
      const birthDate = new Date(dob);

      // Check if date is valid
      if (isNaN(birthDate.getTime())) {
        // If the string is a direct age value (common form submission issue)
        if (!isNaN(parseInt(dob))) {
          return parseInt(dob);
        }
        return 'N/A';
      }

      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();

      // Adjust age if birthday hasn't occurred yet this year
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      // Double-check for unreasonably high or negative ages
      return age < 0 || age > 120 ? 'N/A' : age;
    } catch (error) {
      console.error('Error calculating age:', error);

      // If the string is a direct age value (common form submission issue)
      if (!isNaN(parseInt(dob))) {
        return parseInt(dob);
      }
      return 'N/A';
    }
  };

  return (
    <AdminLayout handleLogout={handleLogout}>
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-20 bg-[#1e0d24] border-b border-purple-800/30 flex items-center justify-between px-6"
      >
        <h2 className="text-xl font-semibold text-amber-100">
          Ramani Girls Management
        </h2>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
            />
            <input
              type="text"
              placeholder="Search girls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#2a1533] text-amber-50 border border-purple-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            />
          </div>

          <div className="flex items-center bg-[#2a1533] border border-purple-700/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${
                viewMode === 'grid'
                  ? 'bg-purple-900/50 text-amber-300'
                  : 'text-amber-100'
              }`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${
                viewMode === 'list'
                  ? 'bg-purple-900/50 text-amber-300'
                  : 'text-amber-100'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main area */}
      <main className="flex-1 p-6 overflow-auto flex flex-col min-h-[calc(100vh-5rem)]">
        {/* Action buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-between mb-6 gap-4"
        >
          <div>
            <h3 className="text-lg font-medium text-amber-100">
              {filteredGirls?.length} Ramani Girls{' '}
              {searchTerm && `(filtered from ${girls.length})`}
            </h3>
            <div className="flex mt-2 gap-4">
              <div className="px-3 py-1 bg-[#2a1533] rounded-lg text-center border border-purple-700/50">
                <span className="text-sm text-purple-300">Not Married:</span>{' '}
                <span className="text-green-400 font-medium">
                  {
                    filteredGirls.filter(
                      (girl) => girl?.isAlreadyMarried === 'No'
                    ).length
                  }
                </span>
              </div>
              <div className="px-3 py-1 bg-[#2a1533] rounded-lg text-center border border-purple-700/50">
                <span className="text-sm text-purple-300">Married:</span>{' '}
                <span className="text-amber-400 font-medium">
                  {
                    filteredGirls.filter(
                      (girl) => girl?.isAlreadyMarried === 'Yes'
                    ).length
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={exportToCSV}
              disabled={loading || filteredGirls.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-[#1e0d24] font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? (
                'Exporting...'
              ) : (
                <>
                  <Download size={18} />
                  <span>Export CSV</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Error handling */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-red-400 mb-2">
              Error Loading Data
            </h3>
            <p className="text-red-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500/30 hover:bg-red-500/40 text-red-200 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && !error && (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-400 mb-4"></div>
              <p className="text-amber-200">Loading girls data...</p>
            </div>
          </div>
        )}

        {/* Girl list */}
        {!loading && !error && (
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {currentGirls.length === 0 ? (
                  <div className="col-span-full py-12 text-center">
                    <h3 className="text-lg font-medium text-amber-200 mb-2">
                      {searchTerm ? 'No results found' : 'No girls registered'}
                    </h3>
                    <p className="text-amber-100/70">
                      {searchTerm
                        ? `No records match your search for "${searchTerm}"`
                        : 'There are no Ramani girls registered yet.'}
                    </p>
                  </div>
                ) : (
                  currentGirls.map((girl) => (
                    <motion.div
                      key={girl._id || girl.createdAt}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-[#1e0d24] to-[#3a1d44] rounded-lg shadow-md overflow-hidden border border-purple-700/30"
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-medium text-amber-200 truncate">
                            {girl.girlName}
                          </h4>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditGirl(girl._id)}
                              className="text-amber-400 hover:text-amber-300 transition-colors"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteGirl(girl._id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        <div className="text-amber-100/80 space-y-2">
                          <p className="flex items-center gap-2">
                            <span className="text-purple-300">Father:</span>
                            <span className="text-amber-100 truncate">
                              {girl.girlFatherName || 'N/A'}
                            </span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="text-purple-300">Age:</span>
                            <span className="text-amber-100">
                              {calculateAge(girl.girlDOB)} years
                            </span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="text-purple-300">Phone:</span>
                            <span className="text-amber-100">
                              {girl.mobileNumber || 'N/A'}
                            </span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="text-purple-300">Status:</span>
                            <span
                              className={`text-amber-100 px-2 py-0.5 rounded-full text-xs ${
                                girl.isAlreadyMarried === 'No'
                                  ? 'bg-green-500/20 text-green-300'
                                  : 'bg-amber-500/20 text-amber-300'
                              }`}
                            >
                              {girl.isAlreadyMarried || 'N/A'}
                            </span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="text-purple-300">Location:</span>
                            <span className="text-amber-100 truncate">
                              {girl.district
                                ? `${girl.district}, ${girl.state || ''}`
                                : 'N/A'}
                            </span>
                          </p>
                        </div>

                        <button
                          onClick={() => handleGirlSelect(girl)}
                          className="mt-4 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-[#1e0d24] to-[#3a1d44] rounded-lg shadow-lg overflow-hidden border border-purple-700/30"
              >
                {currentGirls.length === 0 ? (
                  <div className="py-12 text-center">
                    <h3 className="text-lg font-medium text-amber-200 mb-2">
                      {searchTerm ? 'No results found' : 'No girls registered'}
                    </h3>
                    <p className="text-amber-100/70">
                      {searchTerm
                        ? `No records match your search for "${searchTerm}"`
                        : 'There are no Ramani girls registered yet.'}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-purple-900/30 text-amber-200 border-b border-purple-700/50">
                        <tr>
                          <th className="px-6 py-4 font-medium">Name</th>
                          <th className="px-6 py-4 font-medium">
                            Father's Name
                          </th>
                          <th className="px-6 py-4 font-medium">Age</th>
                          <th className="px-6 py-4 font-medium">Phone</th>
                          <th className="px-6 py-4 font-medium">Location</th>
                          <th className="px-6 py-4 font-medium">Status</th>
                          <th className="px-6 py-4 font-medium">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentGirls.map((girl, index) => (
                          <tr
                            key={girl._id || index}
                            className={`hover:bg-purple-900/20 ${
                              index % 2 === 0 ? 'bg-purple-900/10' : ''
                            }`}
                          >
                            <td className="px-6 py-4 font-medium text-amber-100">
                              {girl.girlName}
                            </td>
                            <td className="px-6 py-4 text-amber-100/80">
                              {girl.girlFatherName || 'N/A'}
                            </td>
                            <td className="px-6 py-4 text-amber-100/80">
                              {calculateAge(girl.girlDOB)} years
                            </td>
                            <td className="px-6 py-4 text-amber-100/80">
                              {girl.mobileNumber || 'N/A'}
                            </td>
                            <td className="px-6 py-4 text-amber-100/80">
                              {girl.district
                                ? `${girl.district}, ${girl.state || ''}`
                                : 'N/A'}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  girl.isAlreadyMarried === 'No'
                                    ? 'bg-green-500/20 text-green-300'
                                    : 'bg-amber-500/20 text-amber-300'
                                }`}
                              >
                                {girl.isAlreadyMarried || 'N/A'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-3">
                                <button
                                  onClick={() => handleGirlSelect(girl)}
                                  className="text-amber-400 hover:text-amber-300 transition-colors"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => handleEditGirl(girl._id)}
                                  className="text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteGirl(girl._id)}
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && !error && (
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-1">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-[#2a1533] text-amber-100 disabled:opacity-50"
              >
                First
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-[#2a1533] text-amber-100 disabled:opacity-50"
              >
                Prev
              </button>

              {/* Page numbers */}
              {[...Array(totalPages)].map((_, i) => {
                // Show current page, one page before and after, first and last pages
                if (
                  i === 0 ||
                  i === totalPages - 1 ||
                  (i >= currentPage - 2 && i <= currentPage)
                ) {
                  return (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? 'bg-amber-600 text-[#1e0d24]'
                          : 'bg-[#2a1533] text-amber-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                } else if (i === currentPage + 1 || i === 1) {
                  return (
                    <span key={i} className="px-1 text-amber-100">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-[#2a1533] text-amber-100 disabled:opacity-50"
              >
                Next
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-[#2a1533] text-amber-100 disabled:opacity-50"
              >
                Last
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Girl details sidebar */}
      {showGirlDetails && selectedGirl && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className="w-full sm:w-96 bg-gradient-to-b from-[#1e0d24] to-[#3a1d44] text-amber-100 border-l border-purple-800/30 fixed top-0 right-0 bottom-0 z-10 flex flex-col shadow-xl"
        >
          <div className="h-20 flex items-center justify-between px-6 border-b border-purple-800/30">
            <h3 className="text-xl font-semibold text-amber-200">
              Girl Details
            </h3>
            <button
              onClick={closeDetailsPanel}
              className="text-amber-300 hover:text-amber-200 transition-colors"
            >
              <Edit size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-lg font-medium text-amber-300">
                  Personal Information
                </h4>
                <div className="bg-purple-900/20 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm text-purple-300">Full Name</p>
                    <p className="text-amber-100">
                      {selectedGirl.girlName || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Father's Name</p>
                    <p className="text-amber-100">
                      {selectedGirl.girlFatherName || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Mother's Name</p>
                    <p className="text-amber-100">
                      {selectedGirl.girlMotherName || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Date of Birth</p>
                    <p className="text-amber-100">
                      {formatDate(selectedGirl.girlDOB)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Age</p>
                    <p className="text-amber-100">
                      {selectedGirl.girlDOB} years
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Phone Number</p>
                    <p className="text-amber-100">
                      {selectedGirl.mobileNumber || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-medium text-amber-300">
                  Address Information
                </h4>
                <div className="bg-purple-900/20 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm text-purple-300">Full Address</p>
                    <p className="text-amber-100">
                      {selectedGirl.fullAddress || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Tehsil</p>
                    <p className="text-amber-100">
                      {selectedGirl.tehsil || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">District</p>
                    <p className="text-amber-100">
                      {selectedGirl.district || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">State</p>
                    <p className="text-amber-100">
                      {selectedGirl.state || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-medium text-amber-300">
                  Marriage Information
                </h4>
                <div className="bg-purple-900/20 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm text-purple-300">Already Married</p>
                    <p
                      className={`text-amber-100 ${
                        selectedGirl.isAlreadyMarried === 'No'
                          ? 'text-green-400'
                          : selectedGirl.isAlreadyMarried === 'Yes'
                          ? 'text-amber-400'
                          : ''
                      }`}
                    >
                      {selectedGirl.isAlreadyMarried || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Wants to Marry</p>
                    <p className="text-amber-100">
                      {selectedGirl.wantToMarry || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Preferred State</p>
                    <p className="text-amber-100">
                      {selectedGirl.wantToMarryState || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Child Name</p>
                    <p className="text-amber-100">
                      {selectedGirl.childName || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Child From</p>
                    <p className="text-amber-100">
                      {selectedGirl.childFrom
                        ? `${selectedGirl.childFrom}${
                            selectedGirl.childDistrict
                              ? ', ' + selectedGirl.childDistrict
                              : ''
                          }`
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-medium text-amber-300">
                  Ramaini Information
                </h4>
                <div className="bg-purple-900/20 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm text-purple-300">Serial No</p>
                    <p className="text-amber-100">
                      {selectedGirl.ramainSiriNo || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Location</p>
                    <p className="text-amber-100">
                      {selectedGirl.location || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Date of Ramaini</p>
                    <p className="text-amber-100">
                      {formatDate(selectedGirl.dateOfRamaini)}
                    </p>
                  </div>
                </div>
              </div>

              {(selectedGirl.girlPhoto ||
                selectedGirl.boyPhoto ||
                selectedGirl.girlSignature ||
                selectedGirl.familySignature) && (
                <div className="space-y-2">
                  <h4 className="text-lg font-medium text-amber-300">
                    Documents
                  </h4>
                  <div className="bg-purple-900/20 p-4 rounded-lg grid grid-cols-2 gap-3">
                    {selectedGirl.girlPhoto && (
                      <a
                        href={selectedGirl.girlPhoto}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-900/30 p-3 rounded-lg text-center hover:bg-purple-900/40 transition-colors"
                      >
                        <span className="text-amber-300 text-sm">
                          Girl Photo
                        </span>
                      </a>
                    )}
                    {selectedGirl.boyPhoto && (
                      <a
                        href={selectedGirl.boyPhoto}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-900/30 p-3 rounded-lg text-center hover:bg-purple-900/40 transition-colors"
                      >
                        <span className="text-amber-300 text-sm">
                          Boy Photo
                        </span>
                      </a>
                    )}
                    {selectedGirl.girlSignature && (
                      <a
                        href={selectedGirl.girlSignature}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-900/30 p-3 rounded-lg text-center hover:bg-purple-900/40 transition-colors"
                      >
                        <span className="text-amber-300 text-sm">
                          Girl Signature
                        </span>
                      </a>
                    )}
                    {selectedGirl.familySignature && (
                      <a
                        href={selectedGirl.familySignature}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-900/30 p-3 rounded-lg text-center hover:bg-purple-900/40 transition-colors"
                      >
                        <span className="text-amber-300 text-sm">
                          Family Signature
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div className="text-sm text-gray-400 border-t border-purple-700/30 pt-4 mt-6">
                <div className="flex justify-between">
                  <span>Created: {formatDate(selectedGirl.createdAt)}</span>
                  <span>Updated: {formatDate(selectedGirl.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-purple-800/30">
            <div className="flex gap-4">
              <button
                className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-[#1e0d24] font-medium rounded-lg transition-colors"
                onClick={() => handleEditGirl(selectedGirl._id)}
              >
                Edit Girl
              </button>
              <button
                onClick={() => handleDeleteGirl(selectedGirl._id)}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Notification */}
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg ${
            notification.type === 'success'
              ? 'bg-green-500/90 text-white'
              : 'bg-red-500/90 text-white'
          }`}
        >
          {notification.message}
        </motion.div>
      )}
    </AdminLayout>
  );
};

export default RamaniGirlList;
