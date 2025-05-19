const DeclarationSection = ({ formData, register, errors }) => {
  // Extract form data using react-hook-form watch method
  return (
    <div className="bg-red-50 p-4 rounded-lg mb-6 border border-red-200">
      <h2 className="text-lg font-medium text-red-800 mb-3">
        Declaration Summary
      </h2>
      <div className="text-sm space-y-2 mb-4">
        <p>
          I,{' '}
          <span className="font-semibold">
            {formData.declarantName || '___________'}
          </span>
          , son/daughter of{' '}
          <span className="font-semibold">
            {formData.declarantSon || '___________'}
          </span>
          , resident of{' '}
          <span className="font-semibold">
            {formData.declarantResident || '___________'}
          </span>
          , hereby declare that:
        </p>

        <ol className="list-decimal pl-5 space-y-1">
          <li>
            I am getting my daughter{' '}
            <span className="font-semibold">
              {formData.girlName || '___________'}
            </span>{' '}
            married (Ramaini) with my full consent.
          </li>
          <li>
            The bride is{' '}
            <span className="font-semibold">{formData.girlAge || '__'}</span>{' '}
            years old, born on{' '}
            <span className="font-semibold">
              {formData.girlDOB || '___________'}
            </span>
            , and meets the age requirement under the Indian Marriage Act, 1955.
          </li>
          <li>The marriage is being conducted without any dowry demands.</li>
          <li>
            All the information provided in this form is accurate and true to
            the best of my knowledge.
          </li>
        </ol>

        <p className="mt-4">
          I understand that providing false information is punishable under the
          law, and I accept full responsibility for the accuracy of the
          information provided.
        </p>
      </div>

      <div className="mt-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            {...register('acceptDeclaration', { required: true })}
            className="text-red-600 focus:ring-red-500 h-4 w-4"
          />
          <span className="ml-2 text-sm font-medium">
            I hereby accept this declaration according to the law and confirm
            that all information provided is true and correct.
          </span>
        </label>
        {errors.acceptDeclaration && (
          <p className="text-red-500 text-xs mt-1">
            You must accept the declaration
          </p>
        )}
      </div>
    </div>
  );
};

// Export the component
export default DeclarationSection;
