import { useTranslation } from 'react-i18next';

// Radio question component
const RadioQuestion = ({ label, name, register, errors }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <p className="text-sm font-medium text-gray-700 mb-2">
        {t(label)}
        <span className="text-red-500">*</span>
      </p>
      <div className="flex space-x-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            {...register(name)}
            value="Yes"
            className="text-red-600 focus:ring-red-500"
          />
          <span className="ml-2 text-sm">{t('yes')}</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            {...register(name)}
            value="No"
            className="text-red-600 focus:ring-red-500"
          />
          <span className="ml-2 text-sm">{t('no')}</span>
        </label>
      </div>
      {errors[name] && (
        <p className="mt-1 text-xs text-red-500">{t(errors[name].message)}</p>
      )}
    </div>
  );
};
export default RadioQuestion;
