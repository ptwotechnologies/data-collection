import { useTranslation } from 'react-i18next';

const InputField = ({
  label,
  name,
  type = 'text',
  register,
  errors,
  required = true,
  placeholder = '',
  formType = 'common', // Add this parameter to specify which namespace to use (girl, boy, common)
}) => {
  // Use the specified namespace or fallback to common
  const { t } = useTranslation(formType);

  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {t(label)}
        {required && '*'}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, { required: required })}
        className={`w-full rounded-md border ${
          errors[name] ? 'border-red-500' : 'border-gray-300'
        } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {t('requiredField', { ns: 'common' })}
        </p>
      )}
    </div>
  );
};

export default InputField;
