import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Download, ChevronRight } from 'lucide-react';
import GirlDetailsCard from './GirlDetailsCard';

const RamaniGirlList = () => {
  const [girls, setGirls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGirls, setFilteredGirls] = useState([]);
  const [selectedGirl, setSelectedGirl] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchGirls = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          'https://data-collection-mig2.onrender.com/api/girl/all'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        let girlsArray = [];

        if (
          responseData &&
          responseData.success &&
          Array.isArray(responseData.data)
        ) {
          girlsArray = responseData.data;
        } else if (Array.isArray(responseData)) {
          girlsArray = responseData;
        }

        setGirls(girlsArray);
        setFilteredGirls(girlsArray);
      } catch (err) {
        console.error('Error fetching girls data:', err);
        setError(err.message);
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

  // Handle actions
  const handleEdit = (girlId) => {
    console.log('Edit girl with ID:', girlId);
    // Navigate to edit page or open edit modal
  };

  const handleDelete = async (girlId) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await fetch(
          `https://data-collection-mig2.onrender.com/api/girl/${girlId}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {
          const updatedGirls = girls.filter((girl) => girl._id !== girlId);
          setGirls(updatedGirls);
          setFilteredGirls(filteredGirls.filter((girl) => girl._id !== girlId));
          if (selectedGirl && selectedGirl._id === girlId) {
            setSelectedGirl(null);
          }
          alert('Record deleted successfully');
        } else {
          throw new Error('Failed to delete record');
        }
      } catch (err) {
        console.error('Error deleting girl:', err);
        alert('Error deleting record: ' + err.message);
      }
    }
  };

  const handleViewDetails = (girl) => {
    setSelectedGirl(girl);
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
        ...filteredGirls.map((girl) =>
          [
            (girl.girlName || '').replace(/,/g, ';'),
            (girl.girlFatherName || '').replace(/,/g, ';'),
            girl.girlAge || '',
            girl.mobileNumber || '',
            (girl.district || '').replace(/,/g, ';'),
            (girl.state || '').replace(/,/g, ';'),
            girl.isAlreadyMarried || '',
          ].join(',')
        ),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ramani_girls_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting CSV:', err);
      alert('Error exporting CSV: ' + err.message);
    }
  };

  const closeDetails = () => {
    setSelectedGirl(null);
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
                disabled={filteredGirls.length === 0}
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
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"></div>
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
                  {filteredGirls.length}
                </p>
                <p className="text-gray-400 text-sm">Total</p>
              </div>
              <div className="flex-1 bg-[#1e0d24] rounded-lg p-3 text-center border border-gray-700">
                <p className="text-lg font-semibold text-green-400">
                  {
                    filteredGirls.filter(
                      (girl) => girl?.isAlreadyMarried === 'No'
                    ).length
                  }
                </p>
                <p className="text-gray-400 text-sm">Not Married</p>
              </div>
            </div>
          </div>
        </div>

        {selectedGirl ? (
          <div className="bg-[#1e0d24] border border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">
                {selectedGirl.girlName}'s Details
              </h2>
              <button
                onClick={closeDetails}
                className="p-2 text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="p-6">
              <GirlDetailsCard
                girlData={selectedGirl}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        ) : (
          // Girls List
          <div className="bg-[#1e0d24] border border-gray-700 rounded-lg overflow-hidden">
            {filteredGirls.length === 0 ? (
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
                    {filteredGirls.map((girl) => {
                      if (!girl || !girl._id) return null;

                      return (
                        <tr
                          key={girl._id}
                          className="border-b border-gray-700 hover:bg-[#2a1442]"
                          onClick={() => handleViewDetails(girl)}
                        >
                          <td className="py-3 px-4">{girl.girlName}</td>
                          <td className="py-3 px-4">{girl.girlFatherName}</td>
                          <td className="py-3 px-4">{girl.mobileNumber}</td>
                          <td className="py-3 px-4">
                            {girl.district}
                            {girl.state && `, ${girl.state}`}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                girl.isAlreadyMarried === 'No'
                                  ? 'bg-green-500/20 text-green-300'
                                  : 'bg-red-500/20 text-red-300'
                              }`}
                            >
                              {girl.isAlreadyMarried || 'N/A'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex justify-center items-center space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(girl._id);
                                }}
                                className="p-1 text-blue-400 hover:text-blue-300"
                                title="Edit"
                              >
                                Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(girl._id);
                                }}
                                className="p-1 text-red-400 hover:text-red-300"
                                title="Delete"
                              >
                                Delete
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewDetails(girl);
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

export default RamaniGirlList;
