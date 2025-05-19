import { useTranslation } from 'react-i18next';
// File upload component
const FileUpload = ({ id, label, onChange, preview }) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg w-full h-32">
      <input
        type="file"
        id={id}
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
      <label
        htmlFor={id}
        className="cursor-pointer flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-red-300 rounded-lg hover:bg-red-50"
      >
        {preview ? (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={preview}
              alt="Preview"
              className="h-full object-contain rounded-lg"
            />
          </div>
        ) : (
          <div className="text-center text-sm text-gray-500">
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p>{t(label)}</p>
          </div>
        )}
      </label>
    </div>
  );
};
export default FileUpload;
