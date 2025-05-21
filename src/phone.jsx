import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';
import axiosInstance from './context/axiosInstance';

// Styles for PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    position: 'relative',
  },
  border: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#8B0000',
    pointerEvents: 'none',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B0000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ornament: {
    width: 250,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFF4F4',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#8B0000',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    paddingBottom: 5,
    marginBottom: 5,
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 12,
    marginBottom: 5,
  },
  declaration: {
    padding: 10,
    marginBottom: 20,
    fontSize: 10,
    lineHeight: 1.5,
    backgroundColor: '#FFF4F4',
  },
  signature: {
    flexDirection: 'row',
  },
  signatureBlock: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    width: '80%',
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 10,
    textAlign: 'center',
  },
  stamp: {
    width: 80,
    height: 80,
    position: 'absolute',
    bottom: 150,
    right: 150,
    opacity: 0.8,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    textAlign: 'center',
  },
  photoBox: {
    width: 100,
    height: 120,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  photoText: {
    fontSize: 8,
  },
  note: {
    fontSize: 8,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  checkbox: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#000000',
    marginRight: 5,
  },
  checkboxLabel: {
    fontSize: 10,
  },
});

// PDF Document Component
const MarriageCertificate = ({ girlData, boyData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.border} />

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>रमैणी (विवाह) रजिस्ट्रेशन फॉर्म</Text>
        <Text style={styles.subtitle}>जय पूर्णब्रह्म कबीर साहेब</Text>
      </View>

      {/* Main Content */}
      <View style={styles.declaration}>
        <Text>
          निवेदन: सतगुरु जी के विश्व कल्याण मिशन के अंतर्गत दहेज-मुक्त विवाह की
          मिसाल स्थापित करने हेतु रमैणी का आयोजन समारोह के समय सतलोक आश्रम में
          ही किया जाए।
        </Text>
        <Text>
          केवल विशेष परिस्थितियों में ही इसका आयोजन नामदान केंद्र अथवा सत्संग
          स्थल पर किया जाए।
        </Text>
      </View>

      {/* Two Column Layout */}
      <View style={styles.row}>
        {/* Boy Information */}
        <View style={styles.column}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>लड़के के परिवार की जानकारी</Text>

            <View style={styles.photoBox}>
              <Text style={styles.photoText}>लड़के का फोटो</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>लड़के का नाम: </Text>
              <Text style={styles.value}>{boyData?.girlName || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>लड़के की जन्मतिथि: </Text>
              <Text style={styles.value}>{boyData?.girlDOB || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>लड़के के पिता का नाम: </Text>
              <Text style={styles.value}>{boyData?.girlFatherName || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>लड़के की माता का नाम: </Text>
              <Text style={styles.value}>{boyData?.girlMotherName || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>पूरा पता: </Text>
              <Text style={styles.value}>{boyData?.fullAddress || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>तहसील: </Text>
              <Text style={styles.value}>{boyData?.tehsil || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>जिला: </Text>
              <Text style={styles.value}>{boyData?.district || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>राज्य: </Text>
              <Text style={styles.value}>{boyData?.state || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>मोबाइल नंबर: </Text>
              <Text style={styles.value}>{boyData?.mobileNumber || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>प्रथम नाम प्राप्ति तिथि: </Text>
              <Text style={styles.value}>
                {boyData?.firstNameReceiptDate || ''}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>सतनाम प्राप्ति तिथि: </Text>
              <Text style={styles.value}>
                {boyData?.satnamReceiptDate || ''}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>सारनाम प्राप्ति तिथि: </Text>
              <Text style={styles.value}>
                {boyData?.dateOfNameReceipt || ''}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>सारशब्द प्राप्ति तिथि: </Text>
              <Text style={styles.value}>
                {boyData?.abstractReceiptDate || ''}
              </Text>
            </View>
          </View>
        </View>

        {/* Girl Information */}
        <View style={styles.column}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>लड़की के परिवार की जानकारी</Text>

            <View style={styles.photoBox}>
              <Text style={styles.photoText}>लड़की का फोटो</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>लड़की का नाम: </Text>
              <Text style={styles.value}>{girlData?.girlName || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>लड़की की जन्मतिथि: </Text>
              <Text style={styles.value}>{girlData?.girlDOB || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>लड़की के पिता का नाम: </Text>
              <Text style={styles.value}>{girlData?.girlFatherName || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>लड़की की माता का नाम: </Text>
              <Text style={styles.value}>{girlData?.girlMotherName || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>पूरा पता: </Text>
              <Text style={styles.value}>{girlData?.fullAddress || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>तहसील: </Text>
              <Text style={styles.value}>{girlData?.tehsil || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>जिला: </Text>
              <Text style={styles.value}>{girlData?.district || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>राज्य: </Text>
              <Text style={styles.value}>{girlData?.state || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>मोबाइल नंबर: </Text>
              <Text style={styles.value}>{girlData?.mobileNumber || ''}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>प्रथम नाम प्राप्ति तिथि: </Text>
              <Text style={styles.value}>
                {girlData?.firstNameReceiptDate || ''}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>सतनाम प्राप्ति तिथि: </Text>
              <Text style={styles.value}>
                {girlData?.satnamReceiptDate || ''}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>सारनाम प्राप्ति तिथि: </Text>
              <Text style={styles.value}>
                {girlData?.dateOfNameReceipt || ''}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>सारशब्द प्राप्ति तिथि: </Text>
              <Text style={styles.value}>
                {girlData?.abstractReceiptDate || ''}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Declaration section */}
      <View style={styles.declaration}>
        <Text>
          हम दोनों परिवार पूर्ण सहमति से अपने बच्चों का यह विवाह (रमैणी) कर रहे
          हैं। हम यह सुनिश्चित करते हैं कि वर और वधू भारतीय विवाह अधिनियम, 1955
          के अंतर्गत निर्धारित आयु सीमा को पूर्ण करते हैं तथा इस विवाह/रमैणी के
          लिए सभी आवश्यक कानूनी प्रक्रियाओं का पालन किया गया है।
        </Text>
      </View>

      {/* Questions section */}
      <View style={styles.section}>
        <View style={styles.checkboxRow}>
          <View
            style={[
              styles.checkbox,
              girlData?.isAdult === 'Yes' ? { backgroundColor: '#000' } : {},
            ]}
          />
          <Text style={styles.checkboxLabel}>
            क्या आपके पुत्र/पुत्री की आयु (लड़की 18 वर्ष, लड़का 21 वर्ष) सरकार
            के नियमों के अनुसार पूर्ण हो चुकी है?
          </Text>
        </View>

        <View style={styles.checkboxRow}>
          <View
            style={[
              styles.checkbox,
              girlData?.isDowryFree === 'Yes'
                ? { backgroundColor: '#000' }
                : {},
            ]}
          />
          <Text style={styles.checkboxLabel}>
            क्या दोनों पक्षों ने अपने देश, गाँव आदि का ध्यान रखकर केवल शुद्ध
            विवाह (रमैणी) करने का निर्णय लिया है?
          </Text>
        </View>

        <View style={styles.checkboxRow}>
          <View
            style={[
              styles.checkbox,
              girlData?.agreeWithRules === 'Yes'
                ? { backgroundColor: '#000' }
                : {},
            ]}
          />
          <Text style={styles.checkboxLabel}>
            क्या आप सतलोक आश्रम के अंतर्गत होने वाले रमैणी विवाह के नियमों से
            सहमत हैं?
          </Text>
        </View>

        <View style={styles.checkboxRow}>
          <View
            style={[
              styles.checkbox,
              girlData?.isAlreadyMarried === 'Yes'
                ? { backgroundColor: '#000' }
                : {},
            ]}
          />
          <Text style={styles.checkboxLabel}>
            क्या लड़का पहले से विवाहित है? क्या लड़की पहले से विवाहित है?
          </Text>
        </View>
      </View>

      <View style={styles.note}>
        <Text>
          (अगर हां तो तलाक के पेपर फॉर्म के साथ लगाना अनिवार्य है, अन्यथा रमैणी
          नहीं करवाई जायेगी।)
        </Text>
      </View>

      {/* Marriage details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>विवाह विवरण</Text>

        <View style={styles.row}>
          <Text style={styles.label}>विवाह दिनांक: </Text>
          <Text style={styles.value}>{girlData?.dateOfRamaini || ''}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>स्थान: </Text>
          <Text style={styles.value}>{girlData?.location || ''}</Text>
        </View>
      </View>

      {/* Note */}
      <View style={styles.note}>
        <Text>
          नोट: लड़का व लड़की और माता-पिता का आधार कार्ड, नामदीक्षा फॉर्म की
          फोटोकॉपी, 10वीं मार्कशीट और दोनों की 1-1 फोटो फॉर्म के साथ लगाना
          अनिवार्य है।
        </Text>
      </View>

      {/* Signatures */}
      <View style={styles.signature}>
        <View style={styles.signatureBlock}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>लड़के (वर) के हस्ताक्षर</Text>
        </View>

        <View style={styles.signatureBlock}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>लड़की (वधू) के हस्ताक्षर</Text>
        </View>
      </View>

      <View style={styles.signature}>
        <View style={styles.signatureBlock}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>
            लड़के (वर) के परिजन के हस्ताक्षर
          </Text>
          <Text style={styles.signatureText}>
            नाम: {boyData?.girlSignatureName || ''}
          </Text>
          <Text style={styles.signatureText}>
            मोबाइल नंबर: {boyData?.girlSignatureMobile || ''}
          </Text>
          <Text style={styles.signatureText}>
            लड़के से रिश्ता: {boyData?.girlSignatureRelation || ''}
          </Text>
        </View>

        <View style={styles.signatureBlock}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>
            लड़की (वधू) के परिजन के हस्ताक्षर
          </Text>
          <Text style={styles.signatureText}>
            नाम: {girlData?.girlSignatureName || ''}
          </Text>
          <Text style={styles.signatureText}>
            मोबाइल नंबर: {girlData?.girlSignatureMobile || ''}
          </Text>
          <Text style={styles.signatureText}>
            लड़की से रिश्ता: {girlData?.girlSignatureRelation || ''}
          </Text>
        </View>
      </View>

      {/* Official Stamp */}
      <View style={styles.stamp}>
        <Text>Official Stamp</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>
          नोट: यह पत्र केवल राज्य, जिला मेडावर व नामदान केन्द्र हेतु सूचनार्थ ही
          मान्य है, सतलोक आश्रम से बाहर किसी कार्य में मान्य नहीं होगा। यह पत्र
          अन्य किसी भी मेडावर को नहीं देना है।
        </Text>
      </View>
    </Page>
  </Document>
);

// Main Component
export default function RamainiCertificateGenerator() {
  const [boyPhone, setBoyPhone] = useState('');
  const [girlPhone, setGirlPhone] = useState('');
  const [boyData, setBoyData] = useState(null);
  const [girlData, setGirlData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bothFound, setBothFound] = useState(false);

  // Function to fetch girl data by phone number
  const fetchGirlData = async () => {
    if (!girlPhone) return;

    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/girl/search?phone=${girlPhone}`
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

  // Function to fetch boy data by phone number
  const fetchBoyData = async () => {
    if (!boyPhone) return;

    try {
      setLoading(true);
      const response = await axiosInstance.get(`/boy/search?phone=${boyPhone}`);
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
            <div className="text-lg font-bold">जय पूर्णब्रह्म कबीर साहेब</div>
          </div>
          <h1 className="text-xl font-bold text-gray-800">
            रमैणी (विवाह) प्रमाणपत्र जनरेटर
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
            विवाह प्रमाणपत्र खोज
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Boy Phone Search */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  लड़के का मोबाइल नंबर
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
                    {loading ? 'Loading...' : 'खोज'}
                  </button>
                </div>
              </div>

              {/* Girl Phone Search */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  लड़की का मोबाइल नंबर
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
                    {loading ? 'Loading...' : 'खोज'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Display */}
        {(boyData || girlData) && (
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-medium text-purple-800 mb-3">परिणाम</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Boy Data Summary */}
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-medium mb-2">लड़के की जानकारी</h3>
                {boyData ? (
                  <div>
                    <p>
                      <span className="font-semibold">नाम:</span>{' '}
                      {boyData.girlName}
                    </p>
                    <p>
                      <span className="font-semibold">पिता का नाम:</span>{' '}
                      {boyData.girlFatherName}
                    </p>
                    <p>
                      <span className="font-semibold">मोबाइल:</span>{' '}
                      {boyData.mobileNumber}
                    </p>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm mt-2">
                      मिल गया
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500">डेटा नहीं मिला</div>
                )}
              </div>

              {/* Girl Data Summary */}
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-medium mb-2">लड़की की जानकारी</h3>
                {girlData ? (
                  <div>
                    <p>
                      <span className="font-semibold">नाम:</span>{' '}
                      {girlData.girlName}
                    </p>
                    <p>
                      <span className="font-semibold">पिता का नाम:</span>{' '}
                      {girlData.girlFatherName}
                    </p>
                    <p>
                      <span className="font-semibold">मोबाइल:</span>{' '}
                      {girlData.mobileNumber}
                    </p>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm mt-2">
                      मिल गया
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500">डेटा नहीं मिला</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PDF Download Section */}
        {bothFound && (
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-medium text-green-800 mb-3">
              प्रमाणपत्र डाउनलोड
            </h2>
            <p className="mb-4">
              दोनों प्रतिभागियों का डेटा सफलतापूर्वक प्राप्त कर लिया गया है। अब
              आप विवाह प्रमाणपत्र डाउनलोड कर सकते हैं।
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
                    ? 'प्रमाणपत्र तैयार हो रहा है...'
                    : 'विवाह प्रमाणपत्र डाउनलोड करें'
                }
              </PDFDownloadLink>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-gray-600 text-sm border-t pt-4 mt-4">
          <h3 className="font-medium mb-2">निर्देश:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              लड़के और लड़की दोनों का मोबाइल नंबर दर्ज करें जिससे उनके फॉर्म
              डेटा को खोजा जा सके।
            </li>
            <li>
              "खोज" बटन पर क्लिक करें जिससे सिस्टम डेटाबेस से जानकारी लाएगा।
            </li>
            <li>
              यदि दोनों की जानकारी सफलतापूर्वक मिल जाती है, तो "विवाह प्रमाणपत्र
              डाउनलोड करें" बटन दिखाई देगा।
            </li>
            <li>
              डाउनलोड बटन पर क्लिक करके आप PDF फॉर्मेट में प्रमाणपत्र प्राप्त कर
              सकते हैं।
            </li>
            <li>
              आधिकारिक उपयोग के लिए प्रमाणपत्र को प्रिंट करें और आवश्यक
              हस्ताक्षर व स्टांप लगवाएं।
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
