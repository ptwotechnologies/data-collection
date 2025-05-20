import React from 'react';

const BoyDetailsCard = ({ boyData, onEdit, onDelete }) => {
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
    <div className="text-white">
      {/* Header with basic info and actions */}
      <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-700">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500 bg-[#1a092c]">
            {boyData.boyPhoto ? (
              <img
                src={boyData.boyPhoto}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/default-avatar.png';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">
                👤
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">
              {boyData.boyName}
            </h3>
            <p className="text-gray-300 text-sm mb-1">
              Age: {formatAge(boyData.boyDOB)} years
            </p>
            <p className="text-gray-300 text-sm">
              Mobile: {boyData.mobileNumber}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
            onClick={() => onEdit && onEdit(boyData._id)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded-md text-sm"
            onClick={() => onDelete && onDelete(boyData._id)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {/* Two column layout for information sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Section title="Personal Information">
            <InfoItem label="Father's Name" value={boyData.boyFatherName} />
            <InfoItem label="Mother's Name" value={boyData.boyMotherName} />
            <InfoItem
              label="Date of Birth"
              value={formatDate(boyData.boyDOB)}
            />
            <InfoItem label="Education" value={boyData.boyEducation} />
            <InfoItem label="Occupation" value={boyData.boyOccupation} />
          </Section>

          {/* Address Information */}
          <Section title="Address Information">
            <InfoItem label="Full Address" value={boyData.fullAddress} />
            <InfoItem label="Tehsil" value={boyData.tehsil} />
            <InfoItem label="District" value={boyData.district} />
            <InfoItem label="State" value={boyData.state} />
          </Section>

          {/* Marriage Information */}
          <Section title="Marriage Information">
            <InfoItem label="Wants to Marry" value={boyData.wantToMarry} />
            <InfoItem label="Bride's State" value={boyData.wantToMarryState} />
            <InfoItem
              label="Already Married"
              value={boyData.isAlreadyMarried || 'N/A'}
              highlight={boyData.isAlreadyMarried === 'No' ? 'green' : 'red'}
            />
          </Section>

          {/* Ramaini Information */}
          <Section title="Ramaini Information">
            <InfoItem label="Serial No" value={boyData.ramainSiriNo} />
            <InfoItem label="Location" value={boyData.location} />
            <InfoItem
              label="Date of Ramaini"
              value={formatDate(boyData.dateOfRamaini)}
            />
          </Section>
        </div>

        {/* Income Details */}
        <Section title="Income Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem
              label="Monthly Income"
              value={
                boyData.monthlyIncome ? `₹${boyData.monthlyIncome}` : 'N/A'
              }
            />
            <InfoItem
              label="Family Income"
              value={boyData.familyIncome ? `₹${boyData.familyIncome}` : 'N/A'}
            />
            <InfoItem label="Income Source" value={boyData.incomeSource} />
          </div>
        </Section>

        {/* Receipt Information */}
        <Section title="Receipt Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem
              label="First Name Receipt"
              value={formatDate(boyData.firstNameReceiptDate)}
            />
            <InfoItem
              label="Satnam Receipt"
              value={formatDate(boyData.satnamReceiptDate)}
            />
            <InfoItem
              label="Name Receipt"
              value={formatDate(boyData.dateOfNameReceipt)}
            />
            <InfoItem
              label="Abstract Receipt"
              value={formatDate(boyData.abstractReceiptDate)}
            />
          </div>
        </Section>

        {/* Declarant Information */}
        <Section title="Declarant Information">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoItem label="Name" value={boyData.declarantName} />
            <InfoItem label="Son of" value={boyData.declarantSon} />
            <InfoItem label="Resident" value={boyData.declarantResident} />
            <InfoItem
              label="Accept Declaration"
              value={boyData.acceptDeclaration ? 'Yes' : 'No'}
              highlight={boyData.acceptDeclaration ? 'green' : 'red'}
            />
          </div>
        </Section>

        {/* Documents */}
        {(boyData.boyPhoto ||
          boyData.girlPhoto ||
          boyData.boySignature ||
          boyData.familySignature) && (
          <Section title="Documents">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {boyData.boyPhoto && (
                <DocumentLink label="Boy Photo" url={boyData.boyPhoto} />
              )}
              {boyData.girlPhoto && (
                <DocumentLink label="Girl Photo" url={boyData.girlPhoto} />
              )}
              {boyData.boySignature && (
                <DocumentLink
                  label="Boy Signature"
                  url={boyData.boySignature}
                />
              )}
              {boyData.familySignature && (
                <DocumentLink
                  label="Family Signature"
                  url={boyData.familySignature}
                />
              )}
            </div>
          </Section>
        )}

        {/* Record Info */}
        <div className="text-sm text-gray-400 mt-4 pt-4 border-t border-gray-700">
          <div className="flex justify-between">
            <span>Created: {formatDate(boyData.createdAt)}</span>
            <span>Updated: {formatDate(boyData.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components
const Section = ({ title, children }) => (
  <div className="bg-[#1a092c] border border-gray-700 rounded-lg p-4">
    <h4 className="text-lg font-medium text-white mb-3 pb-2 border-b border-gray-700">
      {title}
    </h4>
    <div className="space-y-2">{children}</div>
  </div>
);

const InfoItem = ({ label, value, highlight }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-gray-400">{label}:</span>
    <span
      className={`ml-2 ${
        highlight === 'green'
          ? 'text-green-400'
          : highlight === 'red'
          ? 'text-red-400'
          : 'text-white'
      }`}
    >
      {value || 'N/A'}
    </span>
  </div>
);

const DocumentLink = ({ label, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-3 bg-[#2a1442] border border-gray-700 rounded-lg text-center hover:bg-[#341953] transition-colors"
  >
    <span className="text-white text-sm">{label}</span>
  </a>
);

export default BoyDetailsCard;
