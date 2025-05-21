import React from 'react';
import { useTranslation } from 'react-i18next';

const FileUpload = ({
  id,
  label,
  onChange,
  preview,
  acceptTypes = 'image/*,.pdf',
}) => {
  const { t } = useTranslation();

  return (
    <div className="border-2 border-dashed border-red-300 rounded-lg p-3 bg-white">
      <input
        type="file"
        id={id}
        accept={acceptTypes}
        onChange={onChange}
        className="hidden"
      />
      <label
        htmlFor={id}
        className="cursor-pointer flex flex-col items-center justify-center w-full"
      >
        {preview ? (
          <div className="w-full flex items-center justify-center">
            {preview.endsWith('.pdf') ? (
              <div className="p-4 bg-red-50 rounded-lg text-center">
                <svg
                  className="mx-auto h-10 w-10 text-red-600"
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
                <p className="mt-1 text-sm text-gray-700">PDF Document</p>
              </div>
            ) : (
              <img
                src={preview}
                alt="Uploaded file"
                className="h-24 object-contain rounded-lg"
              />
            )}
          </div>
        ) : (
          <div className="text-center py-3">
            <svg
              className="mx-auto h-8 w-8 text-gray-400"
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
            <p className="mt-2 text-sm text-gray-600">{t(label)}</p>
            <p className="text-xs text-gray-500 mt-1">
              Click to {preview ? 'change' : 'upload'} document
            </p>
          </div>
        )}
      </label>
      {preview && (
        <div className="text-center mt-2">
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

export default FileUpload;
