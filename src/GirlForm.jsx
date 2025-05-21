import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import axiosInstance from './context/axiosInstance';
import Header from './Header';
import i18n from './constants/trans';
import formSchema from './schema/girlSchema';
import InputField from './components/InputField';
import FileUpload from './components/FileUpload';
import RadioQuestion from './components/RadioQuestion';
import DocumentUpload from './components/DocumentUpload';

export default function GirlRamainiForm() {
  const { t } = useTranslation();
  const { t: commonT } = useTranslation('common');
  const { t: girlT } = useTranslation('girl');
  const [language, setLanguage] = useState('en');
  const [girlPhoto, setGirlPhoto] = useState({ file: null, preview: null });
  const [boyPhoto, setBoyPhoto] = useState({ file: null, preview: null });
  const [girlSignature, setGirlSignature] = useState({
    file: null,
    preview: null,
  });
  const [familySignature, setFamilySignature] = useState({
    file: null,
    preview: null,
  });

  // Form and submission states
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeclared, setIsDeclared] = useState(false);
  const [generatedDeclaration, setGeneratedDeclaration] = useState('');
  const [acceptFinalDeclaration, setAcceptFinalDeclaration] = useState(false);

  const [aadharCard, setAadharCard] = useState({ file: null, preview: null });
  const [marksheet, setMarksheet] = useState({ file: null, preview: null });
  const [namdikashaForm, setNamdikashaForm] = useState({
    file: null,
    preview: null,
  });
  const [divorceCertificate, setDivorceCertificate] = useState({
    file: null,
    preview: null,
  });

  const {
    register,
    watch,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      acceptDeclaration: false,
    },
  });

  // Watch form values for auto-filling declaration
  const watchedValues = watch();
  const isAlreadyMarried = watch('isAlreadyMarried');

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const handleFileChange = (e, setterFunction) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setterFunction({ file, preview: previewUrl });
    }
  };

  // Generate declaration based on form data
  const generateDeclaration = () => {
    const data = getValues();
    const declaration = `I am Mr./Mrs. ${
      data.girlFatherName || "[Father's Name]"
    }, son/daughter of ${
      data.declarantSon || "[Grandfather's Name]"
    }, resident of ${data.fullAddress || '[Address]'}, ${
      data.district || '[District]'
    }, ${data.state || '[State]'}. I want my daughter ${
      data.girlName || "[Girl's Name]"
    } from ${data.state || '[State]'} to marry.

I hereby declare that my daughter ${
      data.girlName || "[Girl's Name]"
    } with the consent of ${
      data.childFrom || "[Boy's Father/Guardian Name]"
    } from ${
      data.childDistrict || data.district || '[District]'
    } district will perform Ramaini Siri No. ${
      data.ramainSiriNo || '[Serial Number]'
    } at Location: ${data.location || '[Location]'} on date ${
      data.dateOfRamaini || '[Date]'
    }.

I am getting my daughter married (Ramaini) with my full consent. I assure that the bride and groom fulfill the age limit prescribed under the Indian Marriage Act, 1955 and all the necessary legal procedures have been followed for this marriage/Ramaini.

I also declare that the above information given by me is true, complete and correct. If any error or incorrectness is found in my declaration, I will be fully responsible for it.`;

    setGeneratedDeclaration(declaration);
    setIsDeclared(true);
  };

  // Handle form submission - Direct form submit handler
  // Handle form submission - Direct form submit handler
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Trigger validation
    if (isAlreadyMarried === 'Yes' && !divorceCertificate.file) {
      alert('Please upload your divorce certificate before submitting.');
      return;
    }

    if (
      !aadharCard.file ||
      !marksheet.file ||
      (isAlreadyMarried === 'Yes' && !divorceCertificate.file)
    ) {
      alert('Please upload all required documents before submitting.');
      return;
    }
    const isValid = await trigger();
    if (!isValid) {
      console.log('Form validation failed:', errors);
      return;
    }

    // Check if declaration is accepted
    if (!isDeclared || !acceptFinalDeclaration) {
      alert('Please generate and accept the declaration before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create a new FormData object
      const formData = new FormData();

      // Get all form values from react-hook-form
      const values = getValues();

      // Explicitly get the age value from the DOM
      const ageInput = document.querySelector('input[name="girlAge"]');
      const ageValue = ageInput ? ageInput.value : null;

      // Log for debugging
      console.log('Raw age from DOM:', ageValue);
      console.log('Age from form values:', values.girlAge);

      // Handle each field separately
      Object.keys(values).forEach((key) => {
        if (values[key] !== null && values[key] !== undefined) {
          // Special handling for girlAge field
          if (key === 'girlAge' && ageValue) {
            formData.append('girlAge', ageValue);
          }
          // Special handling for isAlreadyMarried to avoid duplicates
          else if (key === 'isAlreadyMarried') {
            formData.append(key, values[key]);
          }
          // Handle all other fields
          else {
            formData.append(key, values[key].toString());
          }
        }
      });

      // Add the generated declaration
      formData.append('generatedDeclaration', generatedDeclaration);

      // Append files if they exist
      if (girlPhoto.file) {
        formData.append('girlPhoto', girlPhoto.file);
      }
      if (boyPhoto.file) {
        formData.append('boyPhoto', boyPhoto.file);
      }
      if (girlSignature.file) {
        formData.append('girlSignature', girlSignature.file);
      }
      if (familySignature.file) {
        formData.append('familySignature', familySignature.file);
      }

      // Append document files
      if (aadharCard.file) {
        formData.append('aadharCard', aadharCard.file);
      }
      if (marksheet.file) {
        formData.append('marksheet', marksheet.file);
      }
      if (namdikashaForm.file) {
        formData.append('namdikashaForm', namdikashaForm.file);
      }
      if (isAlreadyMarried === 'Yes' && divorceCertificate.file) {
        formData.append('divorceCertificate', divorceCertificate.file);
      }

      // Optional: Log the form data for debugging
      console.log('Form data entries:');
      for (let [key, value] of formData.entries()) {
        if (typeof value !== 'object') {
          console.log(`${key}: ${value}`);
        } else {
          console.log(`${key}: [File]`);
        }
      }

      // Submit to API endpoint
      const response = await axiosInstance.post('/girl/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200 || response.status === 201) {
        setSubmitStatus('success');
        // Reset form or redirect as needed
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-fill declaration fields based on form data
  useEffect(() => {
    if (watchedValues.girlFatherName) {
      setValue('declarantName', watchedValues.girlFatherName);
    }
  }, [watchedValues.girlFatherName, setValue]);

  useEffect(() => {
    if (
      watchedValues.fullAddress ||
      watchedValues.district ||
      watchedValues.state
    ) {
      setValue(
        'declarantResident',
        `${watchedValues.fullAddress || ''}, ${watchedValues.district || ''}, ${
          watchedValues.state || ''
        }`
      );
    }
  }, [
    watchedValues.fullAddress,
    watchedValues.district,
    watchedValues.state,
    setValue,
  ]);

  useEffect(() => {
    if (watchedValues.girlName) {
      setValue('wantToMarry', watchedValues.girlName);
      setValue('childName', watchedValues.girlName);
    }
  }, [watchedValues.girlName, setValue]);

  useEffect(() => {
    if (watchedValues.state) {
      setValue('wantToMarryState', watchedValues.state);
    }
  }, [watchedValues.state, setValue]);

  useEffect(() => {
    if (watchedValues.district) {
      setValue('childDistrict', watchedValues.district);
    }
  }, [watchedValues.district, setValue]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-red-50 p-4 flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl my-4">
          {/* Header with language toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="text-center w-full sm:w-auto">
              <div className="bg-red-600 text-white py-2 px-4 rounded-lg inline-block mb-2">
                <div className="text-base sm:text-lg font-bold">
                  {commonT('subtitle')}
                </div>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                {commonT('title')}
              </h1>
              <h2 className="text-md font-medium text-gray-700 mt-1">
                Girl's family information
              </h2>
            </div>
            <button
              onClick={toggleLanguage}
              className="bg-red-100 text-red-800 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-200 w-full sm:w-auto mt-2 sm:mt-0"
            >
              {commonT('toggleLanguage')}
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Photo Upload Section */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="sm:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Girl's Photo (Bride's Photo)
                </label>
                <div className="flex justify-center">
                  <div className="w-32 h-40 rounded-lg overflow-hidden">
                    <input
                      type="file"
                      id="girlPhoto"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setGirlPhoto)}
                      className="hidden"
                    />
                    <label
                      htmlFor="girlPhoto"
                      className="cursor-pointer flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-red-300 rounded-lg hover:bg-red-50"
                    >
                      {girlPhoto.preview ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <img
                            src={girlPhoto.preview}
                            alt="Girl Photo"
                            className="h-full w-full object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="text-center text-xs text-gray-500">
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
                          <p>Do not upload photo older than 1 month.</p>
                          <p>Photo of girl</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>
              <div className="sm:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Boy's Photo (Groom's Photo)
                </label>
                <div className="flex justify-center">
                  <div className="w-32 h-40 rounded-lg overflow-hidden">
                    <input
                      type="file"
                      id="boyPhoto"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setBoyPhoto)}
                      className="hidden"
                    />
                    <label
                      htmlFor="boyPhoto"
                      className="cursor-pointer flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-red-300 rounded-lg hover:bg-red-50"
                    >
                      {boyPhoto.preview ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <img
                            src={boyPhoto.preview}
                            alt="Boy Photo"
                            className="h-full w-full object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="text-center text-xs text-gray-500">
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
                          <p>Do not upload photo older than 1 month.</p>
                          <p>Boy's photo</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* Personal Information */}
            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-medium text-red-800 mb-3">
                {commonT('personalInfo')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="name"
                  name="girlName"
                  register={register}
                  errors={errors}
                  formType="girl"
                />
                <InputField
                  label="fatherName"
                  name="girlFatherName"
                  register={register}
                  errors={errors}
                  formType="girl"
                />
                <InputField
                  label="motherName"
                  name="girlMotherName"
                  register={register}
                  errors={errors}
                  formType="girl"
                />
                <div className="grid grid-cols-2 gap-2">
                  <InputField
                    label="dob"
                    name="girlDOB"
                    type="date"
                    register={register}
                    errors={errors}
                    formType="girl"
                  />
                  <InputField
                    label="age"
                    name="girlAge"
                    type="number"
                    register={register}
                    errors={errors}
                    formType="girl"
                  />
                </div>
              </div>
            </div>
            {/* Contact Information */}
            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-medium text-red-800 mb-3">
                {commonT('contactInfo')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="fullAddress"
                  name="fullAddress"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="tehsil"
                  name="tehsil"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="district"
                  name="district"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="state"
                  name="state"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="mobileNumber"
                  name="mobileNumber"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="boyMobileNumber"
                  name="boymobileNumber"
                  register={register}
                  errors={errors}
                  formType="girl"
                />
              </div>
            </div>
            {/* Religious Information */}
            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-medium text-red-800 mb-3">
                {commonT('religiousInfo')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="firstNameReceiptDate"
                  name="firstNameReceiptDate"
                  type="date"
                  register={register}
                  errors={errors}
                  required={false}
                />
                <InputField
                  label="satnamReceiptDate"
                  name="satnamReceiptDate"
                  type="date"
                  register={register}
                  errors={errors}
                  required={false}
                />
                <InputField
                  label="nameReceiptDate"
                  name="dateOfNameReceipt"
                  type="date"
                  register={register}
                  errors={errors}
                  required={false}
                />
                <InputField
                  label="abstractReceiptDate"
                  name="abstractReceiptDate"
                  type="date"
                  register={register}
                  errors={errors}
                  required={false}
                />
              </div>
            </div>
            {/* Declaration Section */}
            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-medium text-red-800 mb-3">
                {commonT('declarationDetails')}
              </h2>
              {!isDeclared ? (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label={commonT('declarantSon')}
                        name="declarantSon"
                        register={register}
                        errors={errors}
                        placeholder="Enter grandfather's name"
                      />
                      <InputField
                        label={girlT('childFrom')}
                        name="childFrom"
                        register={register}
                        errors={errors}
                        placeholder="Enter boy's father/guardian name"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <InputField
                        label={commonT('ramainSiriNo')}
                        name="ramainSiriNo"
                        register={register}
                        errors={errors}
                        placeholder="Enter serial number"
                      />
                      <InputField
                        label={commonT('location')}
                        name="location"
                        register={register}
                        errors={errors}
                        placeholder="Enter location"
                      />
                      <InputField
                        label={commonT('dateOfRamaini')}
                        name="dateOfRamaini"
                        type="date"
                        register={register}
                        errors={errors}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      onClick={generateDeclaration}
                      className="px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300"
                    >
                      {commonT('generateDeclaration')}
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-3">
                      {commonT('generatedDeclaration')}
                    </h3>
                    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {generatedDeclaration}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <input
                      type="checkbox"
                      id="acceptFinalDeclaration"
                      checked={acceptFinalDeclaration}
                      onChange={(e) =>
                        setAcceptFinalDeclaration(e.target.checked)
                      }
                      className="mt-1 text-red-600 focus:ring-red-500 rounded"
                    />
                    <label
                      htmlFor="acceptFinalDeclaration"
                      className="text-sm text-gray-700 font-medium"
                    >
                      {commonT('acceptFinalDeclaration')}
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsDeclared(false);
                      setAcceptFinalDeclaration(false);
                    }}
                    className="text-sm text-red-600 hover:text-red-800 underline"
                  >
                    {commonT('editDeclarationDetails')}
                  </button>
                </div>
              )}
            </div>
            {/* Important Questions */}
            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-medium text-red-800 mb-3">
                {commonT('questions')}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-red-600 mt-1">•</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-2">
                      {girlT('isAdult')}
                    </p>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          {...register('isAdult')}
                          value="Yes"
                          className="text-red-600 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm">{commonT('yes')}</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          {...register('isAdult')}
                          value="No"
                          className="text-red-600 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm">{commonT('no')}</span>
                      </label>
                    </div>
                    {errors.isAdult && (
                      <p className="text-red-500 text-xs mt-1">
                        {commonT('requiredField')}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-red-600 mt-1">•</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-2">
                      {commonT('isDowryFree')}
                    </p>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          {...register('isDowryFree')}
                          value="Yes"
                          className="text-red-600 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm">{commonT('yes')}</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          {...register('isDowryFree')}
                          value="No"
                          className="text-red-600 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm">{commonT('no')}</span>
                      </label>
                    </div>
                    {errors.isDowryFree && (
                      <p className="text-red-500 text-xs mt-1">
                        {commonT('requiredField')}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-red-600 mt-1">•</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-2">
                      {commonT('agreeWithRules')}
                    </p>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          {...register('agreeWithRules')}
                          value="Yes"
                          className="text-red-600 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm">{commonT('yes')}</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          {...register('agreeWithRules')}
                          value="No"
                          className="text-red-600 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm">{commonT('no')}</span>
                      </label>
                    </div>
                    {errors.agreeWithRules && (
                      <p className="text-red-500 text-xs mt-1">
                        {commonT('requiredField')}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-red-600 mt-1">•</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-2">
                      {girlT('isAlreadyMarried')}
                    </p>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          {...register('isAlreadyMarried')}
                          value="Yes"
                          className="text-red-600 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm">{commonT('yes')}</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          {...register('isAlreadyMarried')}
                          value="No"
                          className="text-red-600 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm">{commonT('no')}</span>
                      </label>
                    </div>
                    <p className="text-xs mt-2 text-gray-600 italic">
                      (If yes then it is mandatory to attach the divorce papers
                      with the form, otherwise Ramaini will not be done.)
                    </p>
                    {errors.isAlreadyMarried && (
                      <p className="text-red-500 text-xs mt-1">
                        {commonT('requiredField')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Document Upload Section */}

            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-medium text-red-800 mb-3">
                {commonT('requiredDocuments')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Aadhar Card Upload */}
                <DocumentUpload
                  id="aadharCard"
                  title={commonT('aadharCard')}
                  description={commonT('aadharCardDesc')}
                  onChange={(e) => handleFileChange(e, setAadharCard)}
                  preview={aadharCard.preview}
                  isRequired={true}
                  acceptTypes="image/jpeg,image/png,application/pdf"
                />

                {/* 10th Marksheet Upload */}
                <DocumentUpload
                  id="marksheet"
                  title={commonT('marksheet')}
                  description={commonT('marksheetDesc')}
                  onChange={(e) => handleFileChange(e, setMarksheet)}
                  preview={marksheet.preview}
                  isRequired={true}
                  acceptTypes="image/jpeg,image/png,application/pdf"
                />

                {/* Namdikasha Form Upload */}
                <DocumentUpload
                  id="namdikashaForm"
                  title={commonT('namdikashaForm')}
                  description={commonT('namdikashaFormDesc')}
                  onChange={(e) => handleFileChange(e, setNamdikashaForm)}
                  preview={namdikashaForm.preview}
                  isRequired={false}
                  acceptTypes="image/jpeg,image/png,application/pdf"
                />

                {/* Conditional Divorce Certificate Upload */}
                {isAlreadyMarried === 'Yes' && (
                  <DocumentUpload
                    id="divorceCertificate"
                    title={commonT('divorceCertificate')}
                    description={commonT('divorceCertificateDesc')}
                    onChange={(e) => handleFileChange(e, setDivorceCertificate)}
                    preview={divorceCertificate.preview}
                    isRequired={true}
                    acceptTypes="image/jpeg,image/png,application/pdf"
                  />
                )}
              </div>

              {/* Document Requirements Info Box */}
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
                <h3 className="text-sm font-medium text-yellow-800 mb-1">
                  {commonT('documentGuidelines')}
                </h3>
                <ul className="list-disc list-inside text-xs text-yellow-700 space-y-1">
                  <li>{commonT('docGuidelinesClear')}</li>
                  <li>{commonT('docGuidelinesSize')}</li>
                  <li>{commonT('docGuidelinesFormat')}</li>
                  <li>{commonT('docGuidelinesNoEdit')}</li>
                  {isAlreadyMarried === 'Yes' && (
                    <li className="font-medium">
                      {commonT('docGuidelinesDivorce')}
                    </li>
                  )}
                </ul>
              </div>
            </div>
            {/* Signatures */}
            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-medium text-red-800 mb-3">
                {commonT('signatureSection')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    {commonT('familySignature')}
                  </h3>
                  <FileUpload
                    id="familySignature"
                    label="uploadSignature"
                    onChange={(e) => handleFileChange(e, setFamilySignature)}
                    preview={familySignature.preview}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    {girlT('signature')}
                  </h3>
                  <FileUpload
                    id="girlSignature"
                    label="uploadSignature"
                    onChange={(e) => handleFileChange(e, setGirlSignature)}
                    preview={girlSignature.preview}
                  />
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !isDeclared ||
                  !acceptFinalDeclaration ||
                  !aadharCard.file ||
                  !marksheet.file ||
                  (isAlreadyMarried === 'Yes' && !divorceCertificate.file)
                }
                className={`px-12 py-3 font-medium rounded-lg shadow-lg transition duration-300 transform ${
                  isSubmitting ||
                  !isDeclared ||
                  !acceptFinalDeclaration ||
                  !aadharCard.file ||
                  !marksheet.file ||
                  (isAlreadyMarried === 'Yes' && !divorceCertificate.file)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 hover:scale-105 text-white'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  commonT('submit')
                )}
              </button>
            </div>
            {/* Document validation error message */}
            {(!aadharCard.file ||
              !marksheet.file ||
              (isAlreadyMarried === 'Yes' && !divorceCertificate.file)) && (
              <div className="text-center mt-2">
                <p className="text-xs text-red-600">
                  {commonT('uploadRequiredDocs')}
                </p>
              </div>
            )}
            {/* Success/Error Messages */}
            {submitStatus && (
              <div className="mt-6 flex justify-center">
                {submitStatus === 'success' && (
                  <div className="max-w-md w-full p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-green-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">
                          Form Submitted Successfully!
                        </h3>
                        <div className="mt-1 text-sm text-green-700">
                          Your Ramaini registration has been submitted
                          successfully. You will be contacted soon for further
                          procedures.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="max-w-md w-full p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          Submission Failed
                        </h3>
                        <div className="mt-1 text-sm text-red-700">
                          There was an error submitting your form. Please check
                          all fields and try again. If the problem persists,
                          please contact support.
                        </div>
                        <div className="mt-2">
                          <button
                            type="button"
                            onClick={() => setSubmitStatus(null)}
                            className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200"
                          >
                            Try Again
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* Form note */}
            <div className="text-center text-xs text-gray-500 mt-6 p-3 bg-gray-50 rounded">
              <p className="font-medium mb-1">Required Documents:</p>
              <p>{commonT('note')}</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
