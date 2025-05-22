import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Download,
  Edit,
  Trash2,
  Grid,
  List,
  Upload,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import axiosInstance from './context/axiosInstance';
import AdminLayout from './AdminPanel';

const AdminUserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: '',
  });
  const [csvFile, setCsvFile] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = filteredUsers?.length
    ? Math.ceil(filteredUsers.length / itemsPerPage)
    : 0;

  // Fetch data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get('/form');

        // Handle different response formats
        const usersArray = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        setUsers(usersArray);
        setFilteredUsers(usersArray);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || err.message);
        toast.error('Failed to load data');
        setUsers([]);
        setFilteredUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Search functionality
  useEffect(() => {
    try {
      if (searchTerm.trim() === '') {
        setFilteredUsers(users);
      } else {
        const filtered = users.filter((user) => {
          if (!user) return false;

          const searchLower = searchTerm.toLowerCase();
          return (
            (user.fullName &&
              user.fullName.toLowerCase().includes(searchLower)) ||
            (user.emailAddress &&
              user.emailAddress.toLowerCase().includes(searchLower)) ||
            (user.phoneNumber && user.phoneNumber.includes(searchTerm)) ||
            (user.district &&
              user.district.toLowerCase().includes(searchLower)) ||
            (user.state && user.state.toLowerCase().includes(searchLower))
          );
        });
        setFilteredUsers(filtered);
      }
    } catch (err) {
      console.error('Error in search filter:', err);
      setFilteredUsers([]);
    }
  }, [searchTerm, users]);

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

  // Handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axiosInstance.delete(`/form/${userId}`);

      // Update state optimistically
      setUsers((prev) => prev.filter((user) => user._id !== userId));
      setFilteredUsers((prev) => prev.filter((user) => user._id !== userId));

      // Clear selection if needed
      if (selectedUser && selectedUser._id === userId) {
        setSelectedUser(null);
        setShowUserDetails(false);
      }

      showNotification('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
      console.error('Delete Error:', error.response?.data || error.message);
    }
  };

  // Handle user edit
  const handleEditUser = (userId) => {
    console.log('Edit user with ID:', userId);
    // Navigate to edit page or open edit modal
  };

  // Export to CSV
  const exportToCSV = () => {
    setLoading(true);

    setTimeout(() => {
      try {
        const csv = Papa.unparse(
          filteredUsers.map((user) => ({
            Name: user.fullName || '',
            Email: user.emailAddress || '',
            Phone: user.phoneNumber || '',
            'Job Type': user.jobType || '',
            'Business Type': user.businessType || '',
            District: user.district || '',
            State: user.state || '',
            Taluk: user.taluk || '',
            'Job Description': user.jobDescription || '',
          }))
        );

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.setAttribute('href', url);
        link.setAttribute(
          'download',
          `registrations_${new Date().toISOString().split('T')[0]}.csv`
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

  // Handle CSV file change
  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  // Import CSV
  const handleImportCSV = async () => {
    if (!csvFile) {
      toast.error('Please select a CSV file');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', csvFile);

      const response = await axiosInstance.post('/form/import/csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Refresh user list
      const updatedResponse = await axiosInstance.get('/form');
      const usersArray = Array.isArray(updatedResponse.data)
        ? updatedResponse.data
        : Array.isArray(updatedResponse.data?.data)
        ? updatedResponse.data.data
        : [];

      setUsers(usersArray);
      setFilteredUsers(usersArray);

      showNotification(
        `Successfully imported ${response.data.insertedCount} users`
      );
      setShowImportModal(false);
      setCsvFile(null);
    } catch (err) {
      console.error('Import error:', err);
      toast.error(err.response?.data?.error || 'Failed to import CSV');
    } finally {
      setLoading(false);
    }
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
    setShowUserDetails(false);
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
          User Management
        </h2>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
            />
            <input
              type="text"
              placeholder="Search users..."
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
            Manage users, view analytics, and administer your platform from this
            central hub.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-between mb-6 gap-4"
        >
          <div>
            <h3 className="text-lg font-medium text-amber-100">
              {filteredUsers?.length} Users{' '}
              {searchTerm && `(filtered from ${users.length})`}
            </h3>
            <div className="flex mt-2 gap-4">
              <div className="px-3 py-1 bg-[#2a1533] rounded-lg text-center border border-purple-700/50">
                <span className="text-sm text-purple-300">Business:</span>{' '}
                <span className="text-green-400 font-medium">
                  {
                    filteredUsers.filter(
                      (user) => user?.businessType === 'Business'
                    ).length
                  }
                </span>
              </div>
              <div className="px-3 py-1 bg-[#2a1533] rounded-lg text-center border border-purple-700/50">
                <span className="text-sm text-purple-300">Job:</span>{' '}
                <span className="text-amber-400 font-medium">
                  {
                    filteredUsers.filter((user) => user?.jobType === 'Job')
                      .length
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-amber-100 font-medium rounded-lg transition-colors"
            >
              <Upload size={18} />
              <span>Import CSV</span>
            </button>
            <button
              onClick={exportToCSV}
              disabled={loading || filteredUsers.length === 0}
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
              <p className="text-amber-200">Loading user data...</p>
            </div>
          </div>
        )}

        {/* User list */}
        {!loading && !error && (
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {currentUsers.length === 0 ? (
                  <div className="col-span-full py-12 text-center">
                    <h3 className="text-lg font-medium text-amber-200 mb-2">
                      {searchTerm ? 'No results found' : 'No users registered'}
                    </h3>
                    <p className="text-amber-100/70">
                      {searchTerm
                        ? `No records match your search for "${searchTerm}"`
                        : 'There are no users registered yet.'}
                    </p>
                  </div>
                ) : (
                  currentUsers.map((user) => (
                    <motion.div
                      key={user._id || user.createdAt}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-[#1e0d24] to-[#3a1d44] rounded-lg shadow-md overflow-hidden border border-purple-700/30"
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-medium text-amber-200 truncate">
                            {user.fullName}
                          </h4>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditUser(user._id)}
                              className="text-amber-400 hover:text-amber-300 transition-colors"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        <div className="text-amber-100/80 space-y-2">
                          <p className="flex items-center gap-2">
                            <span className="text-purple-300">Email:</span>
                            <span className="text-amber-100 truncate">
                              {user.emailAddress || 'N/A'}
                            </span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="text-purple-300">Phone:</span>
                            <span className="text-amber-100">
                              {user.phoneNumber || 'N/A'}
                            </span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="text-purple-300">Type:</span>
                            <span
                              className={`text-amber-100 px-2 py-0.5 rounded-full text-xs ${
                                user.jobType === 'Job'
                                  ? 'bg-blue-500/20 text-blue-300'
                                  : 'bg-green-500/20 text-green-300'
                              }`}
                            >
                              {user.jobType || user.businessType || 'N/A'}
                            </span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="text-purple-300">Location:</span>
                            <span className="text-amber-100 truncate">
                              {user.district
                                ? `${user.district}, ${user.state || ''}`
                                : 'N/A'}
                            </span>
                          </p>
                        </div>

                        <button
                          onClick={() => handleUserSelect(user)}
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
                {currentUsers.length === 0 ? (
                  <div className="py-12 text-center">
                    <h3 className="text-lg font-medium text-amber-200 mb-2">
                      {searchTerm ? 'No results found' : 'No users registered'}
                    </h3>
                    <p className="text-amber-100/70">
                      {searchTerm
                        ? `No records match your search for "${searchTerm}"`
                        : 'There are no users registered yet.'}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-purple-900/30 text-amber-200 border-b border-purple-700/50">
                        <tr>
                          <th className="px-6 py-4 font-medium">Name</th>
                          <th className="px-6 py-4 font-medium">Email</th>
                          <th className="px-6 py-4 font-medium">Phone</th>
                          <th className="px-6 py-4 font-medium">Type</th>
                          <th className="px-6 py-4 font-medium">Location</th>
                          <th className="px-6 py-4 font-medium">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentUsers.map((user, index) => (
                          <tr
                            key={user._id || index}
                            className={`hover:bg-purple-900/20 ${
                              index % 2 === 0 ? 'bg-purple-900/10' : ''
                            }`}
                          >
                            <td className="px-6 py-4 font-medium text-amber-100">
                              {user.fullName}
                            </td>
                            <td className="px-6 py-4 text-amber-100/80">
                              {user.emailAddress || 'N/A'}
                            </td>
                            <td className="px-6 py-4 text-amber-100/80">
                              {user.phoneNumber || 'N/A'}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  user.jobType === 'Job'
                                    ? 'bg-blue-500/20 text-blue-300'
                                    : 'bg-green-500/20 text-green-300'
                                }`}
                              >
                                {user.jobType || user.businessType || 'N/A'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-amber-100/80">
                              {user.district
                                ? `${user.district}, ${user.state || ''}`
                                : 'N/A'}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-3">
                                <button
                                  onClick={() => handleUserSelect(user)}
                                  className="text-amber-400 hover:text-amber-300 transition-colors"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => handleEditUser(user._id)}
                                  className="text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(user._id)}
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

      {/* User details sidebar */}
      {showUserDetails && selectedUser && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className="w-full sm:w-96 bg-gradient-to-b from-[#1e0d24] to-[#3a1d44] text-amber-100 border-l border-purple-800/30 fixed top-0 right-0 bottom-0 z-10 flex flex-col shadow-xl"
        >
          <div className="h-20 flex items-center justify-between px-6 border-b border-purple-800/30">
            <h3 className="text-xl font-semibold text-amber-200">
              User Details
            </h3>
            <button
              onClick={closeDetailsPanel}
              className="text-amber-300 hover:text-amber-200 transition-colors"
            >
              <X size={24} />
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
                      {selectedUser.fullName || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Email Address</p>
                    <p className="text-amber-100">
                      {selectedUser.emailAddress || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Phone Number</p>
                    <p className="text-amber-100">
                      {selectedUser.phoneNumber || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-medium text-amber-300">
                  Job/Business Information
                </h4>
                <div className="bg-purple-900/20 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm text-purple-300">Type</p>
                    <p className="text-amber-100">
                      {selectedUser.jobType ||
                        selectedUser.businessType ||
                        'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Description</p>
                    <p className="text-amber-100">
                      {selectedUser.jobDescription || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-medium text-amber-300">
                  Location Information
                </h4>
                <div className="bg-purple-900/20 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm text-purple-300">State</p>
                    <p className="text-amber-100">
                      {selectedUser.state || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">District</p>
                    <p className="text-amber-100">
                      {selectedUser.district || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Taluk</p>
                    <p className="text-amber-100">
                      {selectedUser.taluk || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-400 border-t border-purple-700/30 pt-4 mt-6">
                <div className="flex justify-between">
                  <span>Created: {formatDate(selectedUser.createdAt)}</span>
                  <span>Updated: {formatDate(selectedUser.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-purple-800/30">
            <div className="flex gap-4">
              <button
                className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-[#1e0d24] font-medium rounded-lg transition-colors"
                onClick={() => handleEditUser(selectedUser._id)}
              >
                Edit User
              </button>
              <button
                onClick={() => handleDeleteUser(selectedUser._id)}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Import CSV Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-[#1e0d24] to-[#3a1d44] rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-semibold text-amber-200 mb-4">
              Import Users from CSV
            </h3>

            <div className="mb-6">
              <p className="text-amber-100 mb-4">
                Upload a CSV file with the following columns: fullName,
                phoneNumber, emailAddress, jobType, businessType, state,
                district, taluk, jobDescription
              </p>

              <label className="block w-full p-4 border-2 border-dashed border-purple-500/50 rounded-lg text-center cursor-pointer hover:bg-purple-900/20 transition-colors">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Upload size={32} className="mx-auto mb-2 text-purple-400" />
                <span className="text-amber-200 block mb-1">
                  {csvFile ? csvFile.name : 'Choose CSV file'}
                </span>
                <span className="text-purple-300 text-sm">
                  {csvFile
                    ? `${(csvFile.size / 1024).toFixed(2)} KB`
                    : 'Click to browse'}
                </span>
              </label>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleImportCSV}
                disabled={!csvFile || loading}
                className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-[#1e0d24] font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-transparent border-t-[#1e0d24] rounded-full animate-spin"></div>
                    <span>Importing...</span>
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    <span>Import Data</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 bg-purple-900/30 hover:bg-purple-900/40 text-purple-200 border border-purple-700/30 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
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

export default AdminUserList;
