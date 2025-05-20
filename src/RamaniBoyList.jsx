import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Download, ChevronRight } from 'lucide-react';
import BoyDetailsCard from './BoyDetailsCard';

const RamaniBoyList = () => {
  const [boys, setBoys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBoys, setFilteredBoys] = useState([]);
  const [selectedBoy, setSelectedBoy] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchBoys = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          'https://data-collection-mig2.onrender.com/api/boy/all'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        let boysArray = [];

        if (
          responseData &&
          responseData.success &&
          Array.isArray(responseData.data)
        ) {
          boysArray = responseData.data;
        } else if (Array.isArray(responseData)) {
          boysArray = responseData;
        }

        setBoys(boysArray);
        setFilteredBoys(boysArray);
      } catch (err) {
        console.error('Error fetching boys data:', err);
        setError(err.message);
        setBoys([]);
        setFilteredBoys([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBoys();
  }, []);

  // Search functionality
  useEffect(() => {
    try {
      if (searchTerm.trim() === '') {
        setFilteredBoys(boys);
      } else {
        const filtered = boys.filter((boy) => {
          if (!boy) return false;

          const searchLower = searchTerm.toLowerCase();
          return (
            (boy.boyName && boy.boyName.toLowerCase().includes(searchLower)) ||
            (boy.boyFatherName &&
              boy.boyFatherName.toLowerCase().includes(searchLower)) ||
            (boy.mobileNumber && boy.mobileNumber.includes(searchTerm)) ||
            (boy.district &&
              boy.district.toLowerCase().includes(searchLower)) ||
            (boy.state && boy.state.toLowerCase().includes(searchLower))
          );
        });
        setFilteredBoys(filtered);
      }
    } catch (err) {
      console.error('Error in search filter:', err);
      setFilteredBoys([]);
    }
  }, [searchTerm, boys]);

  // Handle actions
  const handleEdit = (boyId) => {
    console.log('Edit boy with ID:', boyId);
    // Navigate to edit page or open edit modal
  };

  const handleDelete = async (boyId) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await fetch(
          `https://data-collection-mig2.onrender.com/api/boy/${boyId}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {
          const updatedBoys = boys.filter((boy) => boy._id !== boyId);
          setBoys(updatedBoys);
          setFilteredBoys(filteredBoys.filter((boy) => boy._id !== boyId));
          if (selectedBoy && selectedBoy._id === boyId) {
            setSelectedBoy(null);
          }
          alert('Record deleted successfully');
        } else {
          throw new Error('Failed to delete record');
        }
      } catch (err) {
        console.error('Error deleting boy:', err);
        alert('Error deleting record: ' + err.message);
      }
    }
  };

  const handleViewDetails = (boy) => {
    setSelectedBoy(boy);
  };

  const handleExportCSV = () => {
    try {
      const csvContent = [
        [
          'Name',
          'Father Name',
          'Age',
          'Mobile',
          'District',
          'State',
          'Already Married',
        ].join(','),
        ...filteredBoys.map((boy) =>
          [
            (boy.boyName || '').replace(/,/g, ';'),
            (boy.boyFatherName || '').replace(/,/g, ';'),
            boy.boyAge || '',
            boy.mobileNumber || '',
            (boy.district || '').replace(/,/g, ';'),
            (boy.state || '').replace(/,/g, ';'),
            boy.isAlreadyMarried || '',
          ].join(',')
        ),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ramani_boys_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting CSV:', err);
      alert('Error exporting CSV: ' + err.message);
    }
  };

  const closeDetails = () => {
    setSelectedBoy(null);
  };

  // Error handling
  if (error) {
    return (
      <div className="min-h-screen bg-[#1a092c] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-red-400 mb-4">
              Error Loading Data
            </h2>
            <p className="text-red-300 mb-4">{error}</p>
            <div className="space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Retry
              </button>
              <Link
                to="/admin"
                className="inline-block px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a092c] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white">Loading data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a092c] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Link to="/admin" className="p-2 bg-white/5 rounded-lg">
                <ArrowLeft size={20} className="text-white" />
              </Link>
              <h1 className="text-2xl font-semibold text-white">Ramani Data</h1>
            </div>
            <div>
              <button
                onClick={handleExportCSV}
                disabled={filteredBoys.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-[#6d47a8] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Search and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search by name, father's name, mobile, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#1e0d24] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 bg-[#1e0d24] rounded-lg p-3 text-center border border-gray-700">
                <p className="text-lg font-semibold text-white">
                  {filteredBoys.length}
                </p>
                <p className="text-gray-400 text-sm">Total</p>
              </div>
              <div className="flex-1 bg-[#1e0d24] rounded-lg p-3 text-center border border-gray-700">
                <p className="text-lg font-semibold text-green-400">
                  {
                    filteredBoys.filter((boy) => boy?.isAlreadyMarried === 'No')
                      .length
                  }
                </p>
                <p className="text-gray-400 text-sm">Not Married</p>
              </div>
            </div>
          </div>
        </div>

        {selectedBoy ? (
          <div className="bg-[#1e0d24] border border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">
                {selectedBoy.boyName}'s Details
              </h2>
              <button
                onClick={closeDetails}
                className="p-2 text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="p-6">
              <BoyDetailsCard
                boyData={selectedBoy}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        ) : (
          // Boys List
          <div className="bg-[#1e0d24] border border-gray-700 rounded-lg overflow-hidden">
            {filteredBoys.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">
                  {searchTerm ? 'No results found' : 'No data available'}
                </h3>
                <p className="text-gray-400">
                  {searchTerm
                    ? `No records match your search for "${searchTerm}"`
                    : 'There are no records registered yet.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead className="bg-[#1a092c] border-b border-gray-700">
                    <tr>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Father's Name</th>
                      <th className="py-3 px-4 text-left">Mobile</th>
                      <th className="py-3 px-4 text-left">Location</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBoys.map((boy) => {
                      if (!boy || !boy._id) return null;

                      return (
                        <tr
                          key={boy._id}
                          className="border-b border-gray-700 hover:bg-[#2a1442]"
                          onClick={() => handleViewDetails(boy)}
                        >
                          <td className="py-3 px-4">{boy.boyName}</td>
                          <td className="py-3 px-4">{boy.boyFatherName}</td>
                          <td className="py-3 px-4">{boy.mobileNumber}</td>
                          <td className="py-3 px-4">
                            {boy.district}
                            {boy.state && `, ${boy.state}`}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                boy.isAlreadyMarried === 'No'
                                  ? 'bg-green-500/20 text-green-300'
                                  : 'bg-red-500/20 text-red-300'
                              }`}
                            >
                              {boy.isAlreadyMarried || 'N/A'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex justify-center items-center space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(boy._id);
                                }}
                                className="p-1 text-blue-400 hover:text-blue-300"
                                title="Edit"
                              >
                                Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(boy._id);
                                }}
                                className="p-1 text-red-400 hover:text-red-300"
                                title="Delete"
                              >
                                Delete
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewDetails(boy);
                                }}
                                className="p-1 text-purple-400 hover:text-purple-300"
                              >
                                <ChevronRight size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RamaniBoyList;
