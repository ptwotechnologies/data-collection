import React, { useState, useEffect } from 'react';
import {
  Users,
  FileSpreadsheet,
  Download,
  Upload,
  Database,
  Search,
  Edit,
  Trash2,
  Grid,
  List,
  LogOut,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../src/context/axiosInstance';
import Pagination from './Pagination';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(12);
  const [filteredUsers, setFilteredUsers] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'ascending',
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: '',
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = filteredUsers?.length
    ? Math.ceil(filteredUsers.length / usersPerPage)
    : 0;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Optional: Scroll to top of the user list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/form');
        console.log('Data', response.data);
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        toast.error('Failed to load users');
      }
    };

    fetchUsers();
  }, []);

  // Search and filter
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.emailAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phoneNumber?.includes(searchTerm) ||
          user.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.district?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  // Logout handler
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect to homepage
    navigate('/');
  };

  // Sort handler
  const requestSort = (key) => {
    let direction = 'ascending';

    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key, direction });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setFilteredUsers(sortedUsers);
  };

  // Sort indicator
  const getSortDirection = (name) => {
    if (!sortConfig) return;
    return sortConfig.key === name ? sortConfig.direction : undefined;
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
    try {
      await axiosInstance.delete(`/form/${userId}`);

      // Use _id if that's your identifier
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);

      showNotification('User deleted successfully');

      // Clear selected user if it's the one being deleted
      if (selectedUser && selectedUser._id === userId) {
        setSelectedUser(null);
        setShowUserDetails(false);
      }
    } catch (error) {
      toast.error('Failed to delete user');
      console.error('Delete Error:', error.response?.data || error.message);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    setLoading(true);

    // Add a small delay to show loading indicator (would be replaced by actual API call)
    setTimeout(() => {
      const csv = Papa.unparse(users);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `user_data_${new Date().toISOString().split('T')[0]}.csv`
      );
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setLoading(false);
      showNotification('CSV exported successfully');
    }, 1000);
  };

  // Import from CSV
  const importFromCSV = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axiosInstance.post('/form/import/csv', formData);

      const data = response.data;
      setUsers(data);
      setFilteredUsers(data);
      showNotification(`Successfully imported ${data.length} users`);
    } catch (error) {
      console.error('CSV Import Error:', error);
      showNotification('Failed to import CSV', 'error');
    } finally {
      setLoading(false);
      event.target.value = '';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Close details panel
  const closeDetailsPanel = () => {
    setShowUserDetails(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f051d] to-[#280f40]">
      {/* Sidebar */}
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
          <button className="flex items-center px-4 py-3 text-amber-200 bg-purple-900/30 border-r-4 border-amber-400">
            <Users size={20} className="mr-3" />
            <span className="hidden lg:inline">Users</span>
          </button>

          <button className="flex items-center px-4 py-3 text-amber-100 hover:bg-purple-900/30 hover:text-amber-200 transition-colors">
            <FileSpreadsheet size={20} className="mr-3" />
            <span className="hidden lg:inline">Reports</span>
          </button>

          <button className="flex items-center px-4 py-3 text-amber-100 hover:bg-purple-900/30 hover:text-amber-200 transition-colors">
            <Database size={20} className="mr-3" />
            <span className="hidden lg:inline">Database</span>
          </button>
        </nav>

        <div className="p-4 border-t border-purple-800/30">
          <button
            className="flex items-center px-4 py-3 text-amber-100 hover:bg-purple-900/30 hover:text-amber-200 transition-colors w-full"
            onClick={handleLogout} // Attach the handleLogout function to the onClick event
          >
            <LogOut size={20} className="mr-3" />
            <span className="hidden lg:inline">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
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
            </div>

            <div className="flex gap-3">
              <input
                type="file"
                id="csv-upload"
                onChange={importFromCSV}
                accept=".csv"
                className="hidden"
              />
              <label
                htmlFor="csv-upload"
                className="flex items-center gap-2 px-4 py-2 bg-purple-900/50 hover:bg-purple-800/50 text-amber-100 rounded-lg transition-colors cursor-pointer"
              >
                <Upload size={18} />
                <span>Import CSV</span>
              </label>

              <button
                onClick={exportToCSV}
                disabled={loading}
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

          {/* User list */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredUsers?.map((user) => (
                  <motion.div
                    key={user.createdAt}
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
                            onClick={() => handleUserSelect(user)}
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
                            {user.emailAddress}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-purple-300">Phone:</span>
                          <span className="text-amber-100">
                            {user.phoneNumber}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-purple-300">Type:</span>
                          <span className="text-amber-100 capitalize">
                            {user.jobType} / {user.businessType}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-purple-300">Location:</span>
                          <span className="text-amber-100 truncate">
                            {user.district}, {user.state}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-purple-300">Taluka:</span>
                          <span className="text-amber-100 truncate">
                            {user.taluk}
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
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-[#1e0d24] to-[#3a1d44] rounded-lg shadow-lg overflow-hidden border border-purple-700/30"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-purple-900/30 text-amber-200 border-b border-purple-700/50">
                      <tr>
                        <th
                          className="px-6 py-4 font-medium cursor-pointer"
                          onClick={() => requestSort('fullName')}
                        >
                          <div className="flex items-center gap-1">
                            Name
                            {getSortDirection('fullName') === 'ascending' && (
                              <span>↑</span>
                            )}
                            {getSortDirection('fullName') === 'descending' && (
                              <span>↓</span>
                            )}
                          </div>
                        </th>
                        <th
                          className="px-6 py-4 font-medium cursor-pointer"
                          onClick={() => requestSort('emailAddress')}
                        >
                          <div className="flex items-center gap-1">
                            Email
                            {getSortDirection('emailAddress') ===
                              'ascending' && <span>↑</span>}
                            {getSortDirection('emailAddress') ===
                              'descending' && <span>↓</span>}
                          </div>
                        </th>
                        <th
                          className="px-6 py-4 font-medium cursor-pointer"
                          onClick={() => requestSort('phoneNumber')}
                        >
                          <div className="flex items-center gap-1">
                            Phone
                            {getSortDirection('phoneNumber') ===
                              'ascending' && <span>↑</span>}
                            {getSortDirection('phoneNumber') ===
                              'descending' && <span>↓</span>}
                          </div>
                        </th>
                        <th
                          className="px-6 py-4 font-medium cursor-pointer"
                          onClick={() => requestSort('jobType')}
                        >
                          <div className="flex items-center gap-1">
                            Job Type
                            {getSortDirection('jobType') === 'ascending' && (
                              <span>↑</span>
                            )}
                            {getSortDirection('jobType') === 'descending' && (
                              <span>↓</span>
                            )}
                          </div>
                        </th>
                        <th
                          className="px-6 py-4 font-medium cursor-pointer"
                          onClick={() => requestSort('state')}
                        >
                          <div className="flex items-center gap-1">
                            State
                            {getSortDirection('state') === 'ascending' && (
                              <span>↑</span>
                            )}
                            {getSortDirection('state') === 'descending' && (
                              <span>↓</span>
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-4 font-medium">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredUsers.map((user, index) => (
                        <tr
                          key={user.createdAt}
                          className={`hover:bg-purple-900/20 ${
                            index % 2 === 0 ? 'bg-purple-900/10' : ''
                          }`}
                        >
                          {console.log('USER', user)}
                          <td className="px-6 py-4 font-medium text-amber-100">
                            {user.fullName}
                          </td>
                          <td className="px-6 py-4 text-amber-100/80">
                            {user.emailAddress}
                          </td>
                          <td className="px-6 py-4 text-amber-100/80">
                            {user.phoneNumber}
                          </td>
                          <td className="px-6 py-4 text-amber-100/80 capitalize">
                            {user.jobType} / {user.businessType}
                          </td>
                          <td className="px-6 py-4 text-amber-100/80">
                            {user.state}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleUserSelect(user)}
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>

          {totalPages >= 1 && (
            <div className="mt-auto pt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.max(1, totalPages)}
                onPageChange={handlePageChange}
                className="mb-4"
              />
            </div>
          )}
        </main>
      </div>

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
                    <p className="text-amber-100">{selectedUser.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Email Address</p>
                    <p className="text-amber-100">
                      {selectedUser.emailAddress}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Phone Number</p>
                    <p className="text-amber-100">{selectedUser.phoneNumber}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-medium text-amber-300">
                  Job Information
                </h4>
                <div className="bg-purple-900/20 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm text-purple-300">Job Type</p>
                    <p className="text-amber-100 capitalize">
                      {selectedUser.jobType}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Business Type</p>
                    <p className="text-amber-100 capitalize">
                      {selectedUser.businessType}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-medium text-amber-300">Location</h4>
                <div className="bg-purple-900/20 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm text-purple-300">State</p>
                    <p className="text-amber-100">{selectedUser.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">District</p>
                    <p className="text-amber-100">{selectedUser.district}</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Taluk</p>
                    <p className="text-amber-100">{selectedUser.taluk}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-medium text-amber-300">
                  Registration Info
                </h4>
                <div className="bg-purple-900/20 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm text-purple-300">Registered On</p>
                    <p className="text-amber-100">
                      {formatDate(selectedUser.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">User ID</p>
                    <p className="text-amber-100">{selectedUser._id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-purple-800/30">
            <div className="flex gap-4">
              <button
                className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-[#1e0d24] font-medium rounded-lg transition-colors"
                // onClick={()=> handleUpdateUser(selectedUser._id)}
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
    </div>
  );
};

export default AdminPanel;
