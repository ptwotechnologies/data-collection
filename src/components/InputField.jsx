import { useTranslation } from 'react-i18next';

const InputField = ({
  label,
  name,
  type = 'text',
  register,
  errors,
  required = true,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {t(label)}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        {...register(name)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
      />
      {errors[name] && (
        <p className="mt-1 text-xs text-red-500">{t(errors[name].message)}</p>
      )}
    </div>
  );
};

export default InputField;
