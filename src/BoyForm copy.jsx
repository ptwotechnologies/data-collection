import { useState } from 'react';

export default function RamainiForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission triggered!'); // First test

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const formData = new FormData(e.target);

      // Log all form data
      console.log('Form data:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const API_URL = 'http://localhost:8888/api/boy/submit';
      console.log('Submitting to:', API_URL);

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('Success response:', result);
        setSubmitMessage('Form submitted successfully!');
        e.target.reset(); // Reset form
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setSubmitMessage(`Error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitMessage(`Network error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 p-4 flex justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl my-4">
        <h1 className="text-xl font-bold text-gray-800 mb-6">
          Boy's Family Information
        </h1>

        {/* Show submit message */}
        {submitMessage && (
          <div
            className={`mb-6 p-4 rounded-lg border-2 ${
              submitMessage.includes('successfully')
                ? 'bg-green-50 border-green-400 text-green-800'
                : 'bg-red-50 border-red-400 text-red-800'
            }`}
          >
            <div className="flex items-center">
              {submitMessage.includes('successfully') ? (
                <svg
                  className="w-6 h-6 mr-3 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 mr-3 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <div>
                <h3 className="text-lg font-semibold">
                  {submitMessage.includes('successfully')
                    ? 'Success!'
                    : 'Error!'}
                </h3>
                <p className="text-sm">{submitMessage}</p>
                {submitMessage.includes('successfully') && (
                  <p className="text-sm mt-1 text-green-600">
                    Your form has been submitted successfully. You will be
                    contacted soon for further procedures.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-red-800 mb-3">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Boy's Name *
                </label>
                <input
                  type="text"
                  name="boyName"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Father's Name *
                </label>
                <input
                  type="text"
                  name="boyFatherName"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mother's Name *
                </label>
                <input
                  type="text"
                  name="boyMotherName"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="boyDOB"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age *
                </label>
                <input
                  type="number"
                  name="boyAge"
                  min="21"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-red-800 mb-3">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Address *
                </label>
                <input
                  type="text"
                  name="fullAddress"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tehsil *
                </label>
                <input
                  type="text"
                  name="tehsil"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District *
                </label>
                <input
                  type="text"
                  name="district"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  pattern="[0-9]{10,15}"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Declaration Fields */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-red-800 mb-3">
              Declaration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Declarant Name *
                </label>
                <input
                  type="text"
                  name="declarantName"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Declarant Son/Daughter of *
                </label>
                <input
                  type="text"
                  name="declarantSon"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Declarant Resident *
                </label>
                <input
                  type="text"
                  name="declarantResident"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Want to Marry *
                </label>
                <input
                  type="text"
                  name="wantToMarry"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Want to Marry State *
                </label>
                <input
                  type="text"
                  name="wantToMarryState"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Child Name *
                </label>
                <input
                  type="text"
                  name="childName"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Ramaini *
                </label>
                <input
                  type="date"
                  name="dateOfRamaini"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Signature Information */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-red-800 mb-3">
              Signature Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Boy's Signature Name *
                </label>
                <input
                  type="text"
                  name="boySignatureName"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Boy's Signature Mobile *
                </label>
                <input
                  type="tel"
                  name="boySignatureMobile"
                  pattern="[0-9]{10,15}"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Boy's Signature Relation *
                </label>
                <input
                  type="text"
                  name="boySignatureRelation"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Boy's Signature Date *
                </label>
                <input
                  type="date"
                  name="boySignatureDate"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-red-800 mb-3">
              Important Questions
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">
                  Is the boy above 21 years of age? *
                </p>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isAdult"
                      value="Yes"
                      required
                      className="text-red-600"
                    />
                    <span className="ml-2 text-sm">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isAdult"
                      value="No"
                      required
                      className="text-red-600"
                    />
                    <span className="ml-2 text-sm">No</span>
                  </label>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">
                  Is this marriage dowry free? *
                </p>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isDowryFree"
                      value="Yes"
                      required
                      className="text-red-600"
                    />
                    <span className="ml-2 text-sm">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isDowryFree"
                      value="No"
                      required
                      className="text-red-600"
                    />
                    <span className="ml-2 text-sm">No</span>
                  </label>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">
                  Do you agree with all rules? *
                </p>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="agreeWithRules"
                      value="Yes"
                      required
                      className="text-red-600"
                    />
                    <span className="ml-2 text-sm">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="agreeWithRules"
                      value="No"
                      required
                      className="text-red-600"
                    />
                    <span className="ml-2 text-sm">No</span>
                  </label>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">
                  Is the boy already married? *
                </p>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isAlreadyMarried"
                      value="Yes"
                      required
                      className="text-red-600"
                    />
                    <span className="ml-2 text-sm">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isAlreadyMarried"
                      value="No"
                      required
                      className="text-red-600"
                    />
                    <span className="ml-2 text-sm">No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Accept Declaration */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <label className="inline-flex items-start gap-3">
              <input
                type="checkbox"
                name="acceptDeclaration"
                value="true"
                required
                className="mt-1 text-red-600 focus:ring-red-500 rounded"
              />
              <span className="text-sm text-gray-700 font-medium">
                I accept and agree to the declaration. All information provided
                is true and correct. *
              </span>
            </label>
          </div>

          {/* File Uploads */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-red-800 mb-3">
              Upload Files
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Boy's Photo
                </label>
                <input
                  type="file"
                  name="boyPhoto"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Girl's Photo
                </label>
                <input
                  type="file"
                  name="girlPhoto"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Boy's Signature
                </label>
                <input
                  type="file"
                  name="boySignature"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Family Signature
                </label>
                <input
                  type="file"
                  name="familySignature"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-12 py-3 font-medium rounded-lg shadow-lg transition duration-300 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
