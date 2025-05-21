import React from 'react';
import { useTranslation } from 'react-i18next';

const DocumentUpload = ({
  id,
  title,
  description,
  onChange,
  preview,
  isRequired = false,
  acceptTypes = 'image/*,.pdf',
}) => {
  const getFileTypeIcon = () => {
    if (!preview) return null;

    if (typeof preview === 'string' && preview.endsWith('.pdf')) {
      return (
        <svg
          className="h-10 w-10 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      );
    }

    return (
      <svg
        className="h-10 w-10 text-red-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    );
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-1 mb-2">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {isRequired && (
          <span className="text-red-600 text-xs font-medium ml-1">
            *Required
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs text-gray-500 mb-2">{description}</p>
      )}

      <div className="border-2 border-dashed border-red-300 rounded-lg overflow-hidden">
        <input
          type="file"
          id={id}
          accept={acceptTypes}
          onChange={onChange}
          className="hidden"
        />

        <label htmlFor={id} className="cursor-pointer block w-full">
          {preview ? (
            <div className="flex items-center justify-center p-3 bg-red-50">
              <div className="flex flex-col items-center">
                {getFileTypeIcon()}
                <span className="mt-2 text-sm text-red-800 font-medium">
                  Document uploaded
                </span>
                <span className="text-xs text-gray-600 mt-1">
                  Click to change
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-4 bg-white">
              <svg
                className="h-8 w-8 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600 font-medium">
                Click to upload document
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG or PDF (max 5MB)
              </p>
            </div>
          )}
        </label>
      </div>

      {preview && (
        <div className="mt-1 text-right">
          <button
            type="button"
            onClick={() => {
              document.getElementById(id).value = '';
              onChange({ target: { files: [] } });
            }}
            className="text-xs text-red-600 hover:text-red-800"
          >
            Remove file
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
