import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  Image,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';
import MarriageCertificate from './MarriageCertificate';

// Main Component
export default function DownloadCertificate() {
  const [boyPhone, setBoyPhone] = useState('');
  const [girlPhone, setGirlPhone] = useState('');
  const [boyData, setBoyData] = useState(null);
  const [girlData, setGirlData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bothFound, setBothFound] = useState(false);

  // Function to fetch boy data by phone number
  const fetchBoyData = async () => {
    if (!boyPhone) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://data-collection-mig2.onrender.com/api/boy/search?mobileNumber=${boyPhone}`
      );
      if (response.data.success) {
        setBoyData(response.data.data);
        setError('');
      } else {
        setBoyData(null);
        setError('Boy data not found');
      }
    } catch (err) {
      setError(
        'Error fetching boy data: ' +
          (err.response?.data?.message || err.message)
      );
      setBoyData(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch girl data by phone number
  const fetchGirlData = async () => {
    if (!girlPhone) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://data-collection-mig2.onrender.com/api/girl/search?mobileNumber=${girlPhone}`
      );
      if (response.data.success) {
        setGirlData(response.data.data);
        setError('');
      } else {
        setGirlData(null);
        setError('Girl data not found');
      }
    } catch (err) {
      setError(
        'Error fetching girl data: ' +
          (err.response?.data?.message || err.message)
      );
      setGirlData(null);
    } finally {
      setLoading(false);
    }
  };

  // Check if both data sets are available
  useEffect(() => {
    if (boyData && girlData) {
      setBothFound(true);
    } else {
      setBothFound(false);
    }
  }, [boyData, girlData]);

  return (
    <div className="min-h-screen bg-purple-50 p-4 flex justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl my-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-red-600 text-white py-2 px-4 rounded-lg inline-block mb-2">
            <div className="text-lg font-bold">Glory to Lord Kabir Saheb</div>
          </div>
          <h1 className="text-xl font-bold text-gray-800">
            Marriage Certificate Generator
          </h1>
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Search Form */}
        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-medium text-purple-800 mb-3">
            Marriage Certificate Search
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Boy Phone Search */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Boy's Mobile Number
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={boyPhone}
                    onChange={(e) => setBoyPhone(e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                  <button
                    onClick={fetchBoyData}
                    disabled={loading || !boyPhone}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {loading ? 'Loading...' : 'Search'}
                  </button>
                </div>
              </div>

              {/* Girl Phone Search */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Girl's Mobile Number
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={girlPhone}
                    onChange={(e) => setGirlPhone(e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                  <button
                    onClick={fetchGirlData}
                    disabled={loading || !girlPhone}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {loading ? 'Loading...' : 'Search'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Display */}
        {(boyData || girlData) && (
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-medium text-purple-800 mb-3">
              Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Boy Data Summary */}
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-medium mb-2">Boy's Information</h3>
                {boyData ? (
                  <div>
                    <p>
                      <span className="font-semibold">Name:</span>{' '}
                      {boyData.girlName}
                    </p>
                    <p>
                      <span className="font-semibold">Father's Name:</span>{' '}
                      {boyData.girlFatherName}
                    </p>
                    <p>
                      <span className="font-semibold">Mobile:</span>{' '}
                      {boyData.mobileNumber}
                    </p>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm mt-2">
                      Found
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500">Data not found</div>
                )}
              </div>

              {/* Girl Data Summary */}
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-medium mb-2">Girl's Information</h3>
                {girlData ? (
                  <div>
                    <p>
                      <span className="font-semibold">Name:</span>{' '}
                      {girlData.girlName}
                    </p>
                    <p>
                      <span className="font-semibold">Father's Name:</span>{' '}
                      {girlData.girlFatherName}
                    </p>
                    <p>
                      <span className="font-semibold">Mobile:</span>{' '}
                      {girlData.mobileNumber}
                    </p>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm mt-2">
                      Found
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500">Data not found</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PDF Download Section */}
        {bothFound && (
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-medium text-green-800 mb-3">
              Certificate Download
            </h2>
            <p className="mb-4">
              Both participants' data has been successfully retrieved. You can
              now download the marriage certificate.
            </p>

            <div className="flex justify-center">
              <PDFDownloadLink
                document={
                  <MarriageCertificate girlData={girlData} boyData={boyData} />
                }
                fileName={`marriage_certificate_${girlData.girlName}_${boyData.girlName}.pdf`}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow transition duration-300"
              >
                {({ blob, url, loading, error }) =>
                  loading
                    ? 'Preparing certificate...'
                    : 'Download Marriage Certificate'
                }
              </PDFDownloadLink>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-gray-600 text-sm border-t pt-4 mt-4">
          <h3 className="font-medium mb-2">Instructions:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              Enter both the boy's and girl's mobile numbers to search for their
              form data.
            </li>
            <li>
              Click the "Search" button to retrieve information from the
              database.
            </li>
            <li>
              If both individuals' information is successfully found, the
              "Download Marriage Certificate" button will appear.
            </li>
            <li>
              Click the download button to get the certificate in PDF format.
            </li>
            <li>
              Print the certificate for official use and obtain the necessary
              signatures and stamps.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
