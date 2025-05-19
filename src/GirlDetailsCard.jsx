import React from 'react';

const GirlDetailsCard = ({ girlData, onEdit, onDelete, onViewDetails }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 rounded-2xl p-6 mb-6 text-white shadow-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8 pb-6 border-b border-white/20">
        <div className="flex gap-5 items-start">
          <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-orange-500 shadow-lg shadow-orange-500/30">
            {girlData.girlPhoto ? (
              <img
                src={girlData.girlPhoto}
                alt="Girl"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/default-avatar.png';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-400 flex items-center justify-center text-3xl">
                👤
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-yellow-300 mb-3 text-shadow">
              {girlData.girlName}
            </h3>
            <div className="flex flex-col gap-2">
              <span className="text-gray-200">
                <span className="text-orange-500 font-medium">Age:</span>{' '}
                {formatAge(girlData.girlDOB)} years
              </span>
              <span className="text-gray-200">
                <span className="text-orange-500 font-medium">DOB:</span>{' '}
                {formatDate(girlData.girlDOB)}
              </span>
              <span className="text-gray-200">
                <span className="text-orange-500 font-medium">Mobile:</span>{' '}
                {girlData.mobileNumber}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            className="w-11 h-11 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-lg transition-all duration-300 hover:from-orange-400 hover:to-orange-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/40"
            onClick={() => onEdit(girlData._id)}
            title="Edit"
          >
            ✏️
          </button>
          <button
            className="w-11 h-11 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-lg transition-all duration-300 hover:from-red-400 hover:to-red-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/40"
            onClick={() => onDelete(girlData._id)}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-8">
        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Family Information */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h4 className="text-lg font-bold text-yellow-300 mb-4 pb-2 border-b-2 border-orange-500">
              Family Information
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">
                  Father's Name:
                </span>
                <span className="text-white text-right flex-1 ml-4">
                  {girlData.girlFatherName}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">
                  Mother's Name:
                </span>
                <span className="text-white text-right flex-1 ml-4">
                  {girlData.girlMotherName}
                </span>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h4 className="text-lg font-bold text-yellow-300 mb-4 pb-2 border-b-2 border-orange-500">
              Address Information
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">Full Address:</span>
                <span className="text-white text-right flex-1 ml-4">
                  {girlData.fullAddress}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">Tehsil:</span>
                <span className="text-white text-right flex-1 ml-4">
                  {girlData.tehsil}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">District:</span>
                <span className="text-white text-right flex-1 ml-4">
                  {girlData.district}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">State:</span>
                <span className="text-white text-right flex-1 ml-4">
                  {girlData.state}
                </span>
              </div>
            </div>
          </div>

          {/* Marriage Information */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h4 className="text-lg font-bold text-yellow-300 mb-4 pb-2 border-b-2 border-orange-500">
              Marriage Information
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">
                  Wants to Marry:
                </span>
                <span className="text-white text-right flex-1 ml-4">
                  {girlData.wantToMarry}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">
                  Groom's State:
                </span>
                <span className="text-white text-right flex-1 ml-4">
                  {girlData.wantToMarryState}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">Child Name:</span>
                <span className="text-white text-right flex-1 ml-4">
                  {girlData.childName}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">Child From:</span>
                <span className="text-white text-right flex-1 ml-4">
                  {girlData.childFrom}, {girlData.childDistrict}
                </span>
              </div>
            </div>
          </div>

          {/* Ramaini Information */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h4 className="text-lg font-bold text-yellow-300 mb-4 pb-2 border-b-2 border-orange-500">
              Ramaini Information
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">Serial No:</span>
                <span className="text-white text-right flex-1 ml-4">
                  {girlData.ramainSiriNo}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">Location:</span>
                <span className="text-white text-right flex-1 ml-4">
                  {girlData.location}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">Date:</span>
                <span className="text-white text-right flex-1 ml-4">
                  {formatDate(girlData.dateOfRamaini)}
                </span>
              </div>
            </div>
          </div>

          {/* Receipt Dates */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h4 className="text-lg font-bold text-yellow-300 mb-4 pb-2 border-b-2 border-orange-500">
              Receipt Dates
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">
                  First Name Receipt:
                </span>
                <span className="text-white text-right flex-1 ml-4">
                  {formatDate(girlData.firstNameReceiptDate)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">
                  Satnam Receipt:
                </span>
                <span className="text-white text-right flex-1 ml-4">
                  {formatDate(girlData.satnamReceiptDate)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">Name Receipt:</span>
                <span className="text-white text-right flex-1 ml-4">
                  {formatDate(girlData.dateOfNameReceipt)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">
                  Abstract Receipt:
                </span>
                <span className="text-white text-right flex-1 ml-4">
                  {formatDate(girlData.abstractReceiptDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Declarant Information */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h4 className="text-lg font-bold text-yellow-300 mb-4 pb-2 border-b-2 border-orange-500">
              Declarant Information
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">Name:</span>
                <span className="text-white text-right flex-1 ml-4">
                  {girlData.declarantName}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">Son of:</span>
                <span className="text-white text-right flex-1 ml-4">
                  {girlData.declarantSon}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                <span className="text-gray-300 font-medium">Resident:</span>
                <span className="text-white text-right flex-1 ml-4">
                  {girlData.declarantResident}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h4 className="text-lg font-bold text-yellow-300 mb-4 pb-2 border-b-2 border-orange-500">
            Status Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
              <span className="text-gray-300 font-medium">
                Already Married:
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${
                  girlData.isAlreadyMarried === 'No'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                }`}
              >
                {girlData.isAlreadyMarried || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
              <span className="text-gray-300 font-medium">
                Accept Declaration:
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${
                  girlData.acceptDeclaration
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                }`}
              >
                {girlData.acceptDeclaration ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h4 className="text-lg font-bold text-yellow-300 mb-4 pb-2 border-b-2 border-orange-500">
            Documents
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {girlData.girlPhoto && (
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-gray-300 font-medium">Girl Photo</span>
                <a
                  href={girlData.girlPhoto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-bold transition-all duration-300 hover:from-orange-400 hover:to-orange-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/40"
                >
                  View Photo
                </a>
              </div>
            )}
            {girlData.boyPhoto && (
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-gray-300 font-medium">Boy Photo</span>
                <a
                  href={girlData.boyPhoto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-bold transition-all duration-300 hover:from-orange-400 hover:to-orange-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/40"
                >
                  View Photo
                </a>
              </div>
            )}
            {girlData.girlSignature && (
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-gray-300 font-medium">
                  Girl Signature
                </span>
                <a
                  href={girlData.girlSignature}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-bold transition-all duration-300 hover:from-orange-400 hover:to-orange-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/40"
                >
                  View Signature
                </a>
              </div>
            )}
            {girlData.familySignature && (
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-gray-300 font-medium">
                  Family Signature
                </span>
                <a
                  href={girlData.familySignature}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-bold transition-all duration-300 hover:from-orange-400 hover:to-orange-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/40"
                >
                  View Signature
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Record Info */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex justify-between items-center gap-5">
            <span className="text-sm text-gray-300">
              <span className="text-orange-500 font-medium">Created:</span>{' '}
              {formatDate(girlData.createdAt)}
            </span>
            <span className="text-sm text-gray-300">
              <span className="text-orange-500 font-medium">Updated:</span>{' '}
              {formatDate(girlData.updatedAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-white/20 text-center">
        <button
          className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 rounded-full text-base font-bold transition-all duration-300 hover:from-yellow-300 hover:to-yellow-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-400/40"
          onClick={() =>
            onViewDetails && girlData._id && onViewDetails(girlData._id)
          }
        >
          View Full Details
        </button>
      </div>
    </div>
  );
};

export default GirlDetailsCard;
