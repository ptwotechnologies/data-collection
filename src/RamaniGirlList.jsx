import React, { useState, useEffect } from 'react';
import GirlDetailsCard from './GirlDetailsCard';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Download } from 'lucide-react';

const RamaniGirlList = () => {
  const [girls, setGirls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGirls, setFilteredGirls] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchGirls = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching girls data...');
        const response = await fetch('http://localhost:8888/api/girl/all');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Fetched response:', responseData);

        // Extract the data array from the response
        // The API returns: { success: true, count: number, data: [...] }
        let girlsArray = [];

        if (
          responseData &&
          responseData.success &&
          Array.isArray(responseData.data)
        ) {
          girlsArray = responseData.data;
        } else if (Array.isArray(responseData)) {
          // Fallback in case the API structure changes
          girlsArray = responseData;
        } else {
          console.warn('Unexpected response structure:', responseData);
          girlsArray = [];
        }

        console.log('Processed girls array:', girlsArray);
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
    // You can implement this based on your routing structure
  };

  const handleDelete = async (girlId) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await fetch(
          `http://localhost:8888/api/girl/${girlId}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {
          // Remove the deleted girl from the state
          const updatedGirls = girls.filter((girl) => girl._id !== girlId);
          setGirls(updatedGirls);
          setFilteredGirls(filteredGirls.filter((girl) => girl._id !== girlId));
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

  const handleViewDetails = (girlId) => {
    console.log('View details for girl with ID:', girlId);
    // Navigate to detailed view page or open modal
    // You can implement this based on your requirements
  };

  const handleExportCSV = () => {
    try {
      // Simple CSV export functionality
      const csvContent = [
        // CSV Headers
        [
          'Name',
          'Father Name',
          'Age',
          'Mobile',
          'District',
          'State',
          'Already Married',
        ].join(','),
        // CSV Data
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

  // Error boundary-like error handling
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
              <p className="text-white text-xl">Loading female data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <ArrowLeft size={24} className="text-white" />
              </Link>
              <h1 className="text-4xl font-bold text-yellow-300">
                Ramani Female
              </h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExportCSV}
                disabled={filteredGirls.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={20} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Search and Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <div className="lg:col-span-2 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name, father name, mobile, district..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center border border-white/20">
              <p className="text-2xl font-bold text-yellow-300">
                {filteredGirls.length}
              </p>
              <p className="text-gray-300 text-sm">Total Records</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center border border-white/20">
              <p className="text-2xl font-bold text-green-400">
                {
                  filteredGirls.filter(
                    (girl) => girl?.isAlreadyMarried === 'No'
                  ).length
                }
              </p>
              <p className="text-gray-300 text-sm">Not Married</p>
            </div>
          </div>

          {/* Debug Info - Remove this after fixing */}
          <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 mb-6">
            <h3 className="text-blue-300 font-semibold mb-2">
              Debug Information:
            </h3>
            <p className="text-blue-200 text-sm">
              Total girls in state: {girls.length} | Filtered girls:{' '}
              {filteredGirls.length} | Loading: {loading.toString()} | Error:{' '}
              {error || 'None'}
            </p>
          </div>
        </div>

        {/* Girls List */}
        {filteredGirls.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Filter size={64} className="mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {searchTerm ? 'No results found' : 'No girls data available'}
            </h3>
            <p className="text-gray-400">
              {searchTerm
                ? `No girls match your search for "${searchTerm}"`
                : 'There are no girls registered yet.'}
            </p>
            {!searchTerm && girls.length === 0 && (
              <p className="text-gray-500 text-sm mt-2">
                Check your API endpoint: http://localhost:8888/api/girl/all
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredGirls.map((girl, index) => {
              // Safety check for each girl object
              if (!girl || !girl._id) {
                console.warn('Invalid girl data at index', index, girl);
                return null;
              }

              return (
                <GirlDetailsCard
                  key={girl._id}
                  girlData={girl}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onViewDetails={handleViewDetails}
                />
              );
            })}
          </div>
        )}

        {/* Pagination could be added here if needed */}
      </div>
    </div>
  );
};

export default RamaniGirlList;
