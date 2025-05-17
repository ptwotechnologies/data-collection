import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import axios from 'axios';

// Initialize i18n
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: 'Ramaini (Marriage) Registration Form',
        subtitle: 'Jai Purnabrahma Kabir Saheb',
        personalInfo: 'Personal Information',
        girlName: "Girl's Name",
        girlFatherName: "Father's Name",
        girlMotherName: "Mother's Name",
        girlDOB: 'Date of Birth',
        girlAge: 'Age',
        contactInfo: 'Contact Information',
        fullAddress: 'Full Address',
        tehsil: 'Tehsil',
        district: 'District',
        state: 'State',
        mobileNumber: 'Mobile Number',
        religiousInfo: 'Religious Information',
        firstNameReceiptDate: 'First Name Receipt Date',
        satnamReceiptDate: 'Satnam Receipt Date',
        nameReceiptDate: 'Name Receipt Date',
        abstractReceiptDate: 'Abstract Receipt Date',
        declaration: 'Declaration',
        declarantInfo:
          'I am {{name}}, {{relation}} of {{resident}}, wanting {{person}} from {{state}} to marry.',
        marriageDetails: 'Marriage Details',
        childName: "Child's Name",
        childFrom: 'Child From',
        childDistrict: 'Child District',
        ramainiSiriNo: 'Ramaini Siri No.',
        location: 'Location',
        dateOfRamaini: 'Date of Ramaini',
        questions: 'Important Questions',
        isAdult:
          'Has the girl attained the age of 18 years as per government rules?',
        isDowryFree: 'Is this a dowry-free marriage?',
        agreeWithRules: 'Do you agree with the rules of Ramaini marriage?',
        isAlreadyMarried: 'Is the girl already married?',
        note: 'Note: Aadhaar card of boy and girl and parents, photocopy of Namdiksha form, 10th mark sheet and photos are mandatory.',
        signatureSection: 'Signatures',
        familySignature: 'Family Signature',
        girlSignature: "Girl's Signature",
        sigName: 'Name',
        sigMobile: 'Mobile',
        sigRelation: 'Relationship with girl',
        date: 'Date',
        submit: 'Submit Registration',
        requiredField: 'This field is required',
        invalidMobile: 'Invalid mobile number',
        invalidAge: 'Age must be 18 or above',
        yes: 'Yes',
        no: 'No',
        uploadPhoto: 'Upload Photo',
        uploadSignature: 'Upload Signature',
        success: 'Form submitted successfully!',
        error: 'Error submitting form. Please try again.',
        toggleLanguage: 'भाषा बदलें / Change Language',
      },
    },
    hi: {
      translation: {
        title: 'रमैनी (विवाह) पंजीकरण प्रपत्र',
        subtitle: 'जय पूर्णब्रह्म कबीर साहेब',
        personalInfo: 'व्यक्तिगत जानकारी',
        girlName: 'लड़की का नाम',
        girlFatherName: 'पिता का नाम',
        girlMotherName: 'माता का नाम',
        girlDOB: 'जन्म तिथि',
        girlAge: 'आयु',
        contactInfo: 'संपर्क जानकारी',
        fullAddress: 'पूरा पता',
        tehsil: 'तहसील',
        district: 'जिला',
        state: 'राज्य',
        mobileNumber: 'मोबाइल नंबर',
        religiousInfo: 'धार्मिक जानकारी',
        firstNameReceiptDate: 'प्रथम नाम प्राप्ति तिथि',
        satnamReceiptDate: 'सतनाम प्राप्ति तिथि',
        nameReceiptDate: 'नाम प्राप्ति की तिथि',
        abstractReceiptDate: 'सार प्राप्ति तिथि',
        declaration: 'घोषणा',
        declarantInfo:
          'मैं {{name}}, {{resident}} का {{relation}}, {{state}} से {{person}} से विवाह करना चाहता हूं।',
        marriageDetails: 'विवाह विवरण',
        childName: 'बच्चे का नाम',
        childFrom: 'बच्चा कहां से',
        childDistrict: 'बच्चे का जिला',
        ramainiSiriNo: 'रमैनी सिरी नंबर',
        location: 'स्थान',
        dateOfRamaini: 'रमैनी की तिथि',
        questions: 'महत्वपूर्ण प्रश्न',
        isAdult:
          'क्या लड़की सरकारी नियमों के अनुसार 18 वर्ष की आयु प्राप्त कर चुकी है?',
        isDowryFree: 'क्या यह दहेज-मुक्त विवाह है?',
        agreeWithRules: 'क्या आप रमैनी विवाह के नियमों से सहमत हैं?',
        isAlreadyMarried: 'क्या लड़की पहले से विवाहित है?',
        note: 'नोट: लड़के और लड़की और माता-पिता का आधार कार्ड, नामदीक्षा फॉर्म की फोटोकॉपी, 10वीं की मार्कशीट और फोटो अनिवार्य हैं।',
        signatureSection: 'हस्ताक्षर',
        familySignature: 'परिवार का हस्ताक्षर',
        girlSignature: 'लड़की का हस्ताक्षर',
        sigName: 'नाम',
        sigMobile: 'मोबाइल',
        sigRelation: 'लड़की के साथ संबंध',
        date: 'तिथि',
        submit: 'पंजीकरण जमा करें',
        requiredField: 'यह फ़ील्ड आवश्यक है',
        invalidMobile: 'अमान्य मोबाइल नंबर',
        invalidAge: 'आयु 18 या उससे अधिक होनी चाहिए',
        yes: 'हां',
        no: 'नहीं',
        uploadPhoto: 'फोटो अपलोड करें',
        uploadSignature: 'हस्ताक्षर अपलोड करें',
        success: 'फॉर्म सफलतापूर्वक जमा किया गया!',
        error: 'फॉर्म जमा करने में त्रुटि। कृपया पुनः प्रयास करें।',
        toggleLanguage: 'Change Language / भाषा बदलें',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Create validation schema
const formSchema = z.object({
  girlName: z.string().min(1, { message: 'requiredField' }),
  girlFatherName: z.string().min(1, { message: 'requiredField' }),
  girlMotherName: z.string().min(1, { message: 'requiredField' }),
  girlDOB: z.string().min(1, { message: 'requiredField' }),
  girlAge: z
    .string()
    .min(1, { message: 'requiredField' })
    .refine((val) => parseInt(val) >= 18, { message: 'invalidAge' }),
  fullAddress: z.string().min(1, { message: 'requiredField' }),
  tehsil: z.string().min(1, { message: 'requiredField' }),
  district: z.string().min(1, { message: 'requiredField' }),
  state: z.string().min(1, { message: 'requiredField' }),
  mobileNumber: z
    .string()
    .min(10, { message: 'invalidMobile' })
    .max(15, { message: 'invalidMobile' }),
  firstNameReceiptDate: z.string().optional(),
  satnamReceiptDate: z.string().optional(),
  dateOfNameReceipt: z.string().optional(),
  abstractReceiptDate: z.string().optional(),
  declarantName: z.string().min(1, { message: 'requiredField' }),
  declarantSon: z.string().min(1, { message: 'requiredField' }),
  declarantResident: z.string().min(1, { message: 'requiredField' }),
  wantToMarry: z.string().min(1, { message: 'requiredField' }),
  wantToMarryState: z.string().min(1, { message: 'requiredField' }),
  childName: z.string().min(1, { message: 'requiredField' }),
  childFrom: z.string().optional(),
  childDistrict: z.string().optional(),
  ramainSiriNo: z.string().optional(),
  location: z.string().min(1, { message: 'requiredField' }),
  dateOfRamaini: z.string().min(1, { message: 'requiredField' }),
  isAdult: z.string().min(1, { message: 'requiredField' }),
  isDowryFree: z.string().min(1, { message: 'requiredField' }),
  agreeWithRules: z.string().min(1, { message: 'requiredField' }),
  isAlreadyMarried: z.string().min(1, { message: 'requiredField' }),
  girlSignatureName: z.string().min(1, { message: 'requiredField' }),
  girlSignatureMobile: z
    .string()
    .min(10, { message: 'invalidMobile' })
    .max(15, { message: 'invalidMobile' }),
  girlSignatureRelation: z.string().min(1, { message: 'requiredField' }),
  girlSignatureDate: z.string().min(1, { message: 'requiredField' }),
});

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
        className="cursor-pointer flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-purple-300 rounded-lg hover:bg-purple-50"
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

// Input field component
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
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      />
      {errors[name] && (
        <p className="mt-1 text-xs text-red-500">{t(errors[name].message)}</p>
      )}
    </div>
  );
};

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
            className="text-purple-600 focus:ring-purple-500"
          />
          <span className="ml-2 text-sm">{t('yes')}</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            {...register(name)}
            value="No"
            className="text-purple-600 focus:ring-purple-500"
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

// Main Form Component
export default function RamainiForm() {
  const { t } = useTranslation();
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
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

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
  // submission
  useEffect(() => {
    console.log('Submit status changed:', submitStatus);
  }, [submitStatus]);

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Create FormData object for file uploads
      const submissionData = new FormData();

      // Add form fields
      Object.keys(data).forEach((key) => {
        submissionData.append(key, data[key]);
      });

      // Add files
      if (girlPhoto.file) submissionData.append('girlPhoto', girlPhoto.file);
      if (boyPhoto.file) submissionData.append('boyPhoto', boyPhoto.file);
      if (girlSignature.file)
        submissionData.append('girlSignature', girlSignature.file);
      if (familySignature.file)
        submissionData.append('familySignature', familySignature.file);

      // Send the form data to the server using axios
      const response = await axios.post(
        'https://data-collection-mig2.onrender.com/api/girl/submit',
        submissionData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Form submitted successfully:', response.data);
      setSubmitStatus('success');

      // Optional: Reset form after successful submission
      // reset();
      // setGirlPhoto({ file: null, preview: null });
      // setBoyPhoto({ file: null, preview: null });
      // setGirlSignature({ file: null, preview: null });
      // setFamilySignature({ file: null, preview: null });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 p-4 flex justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl my-4">
        {/* Header with language toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-center w-full sm:w-auto">
            <div className="bg-red-600 text-white py-2 px-4 rounded-lg inline-block mb-2">
              <div className="text-base sm:text-lg font-bold">
                {t('subtitle')}
              </div>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">
              {t('title')}
            </h1>
          </div>
          <button
            onClick={toggleLanguage}
            className="bg-purple-100 text-purple-800 px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-200 w-full sm:w-auto mt-2 sm:mt-0"
          >
            {t('toggleLanguage')}
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Photo Upload Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('Girl Photo')}
              </label>
              <div className="flex justify-center">
                <div className="w-32 h-40 rounded-lg overflow-hidden">
                  {' '}
                  {/* Passport size dimensions */}
                  <input
                    type="file"
                    id="girlPhoto"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setGirlPhoto)}
                    className="hidden"
                  />
                  <label
                    htmlFor="girlPhoto"
                    className="cursor-pointer flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-purple-300 rounded-lg hover:bg-purple-50"
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
                        <p>{t('uploadPhoto')}</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('Boy Photo')}
              </label>
              <div className="flex justify-center">
                <div className="w-32 h-40 rounded-lg overflow-hidden">
                  {' '}
                  {/* Passport size dimensions */}
                  <input
                    type="file"
                    id="boyPhoto"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setBoyPhoto)}
                    className="hidden"
                  />
                  <label
                    htmlFor="boyPhoto"
                    className="cursor-pointer flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-purple-300 rounded-lg hover:bg-purple-50"
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
                        <p>{t('uploadPhoto')}</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-medium text-purple-800 mb-3">
              {t('personalInfo')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="girlName"
                name="girlName"
                register={register}
                errors={errors}
              />
              <InputField
                label="girlFatherName"
                name="girlFatherName"
                register={register}
                errors={errors}
              />
              <InputField
                label="girlMotherName"
                name="girlMotherName"
                register={register}
                errors={errors}
              />
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  label="girlDOB"
                  name="girlDOB"
                  type="date"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="girlAge"
                  name="girlAge"
                  type="number"
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-medium text-purple-800 mb-3">
              {t('contactInfo')}
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
            </div>
          </div>

          {/* Religious Information */}
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-medium text-purple-800 mb-3">
              {t('religiousInfo')}
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

          {/* Declaration & Marriage Details */}
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-medium text-purple-800 mb-3">
              {t('declaration')}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="sigName"
                  name="declarantName"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="sigRelation"
                  name="declarantSon"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="fullAddress"
                  name="declarantResident"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="childName"
                  name="wantToMarry"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="state"
                  name="wantToMarryState"
                  register={register}
                  errors={errors}
                />
              </div>
            </div>

            <h2 className="text-lg font-medium text-purple-800 mt-6 mb-3">
              {t('marriageDetails')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="childName"
                name="childName"
                register={register}
                errors={errors}
              />
              <InputField
                label="childFrom"
                name="childFrom"
                register={register}
                errors={errors}
                required={false}
              />
              <InputField
                label="childDistrict"
                name="childDistrict"
                register={register}
                errors={errors}
                required={false}
              />
              <InputField
                label="ramainiSiriNo"
                name="ramainSiriNo"
                register={register}
                errors={errors}
                required={false}
              />
              <InputField
                label="location"
                name="location"
                register={register}
                errors={errors}
              />
              <InputField
                label="dateOfRamaini"
                name="dateOfRamaini"
                type="date"
                register={register}
                errors={errors}
              />
            </div>
          </div>

          {/* Important Questions */}
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-medium text-purple-800 mb-3">
              {t('questions')}
            </h2>
            <div className="space-y-3">
              <RadioQuestion
                label="isAdult"
                name="isAdult"
                register={register}
                errors={errors}
              />
              <RadioQuestion
                label="isDowryFree"
                name="isDowryFree"
                register={register}
                errors={errors}
              />
              <RadioQuestion
                label="agreeWithRules"
                name="agreeWithRules"
                register={register}
                errors={errors}
              />
              <RadioQuestion
                label="isAlreadyMarried"
                name="isAlreadyMarried"
                register={register}
                errors={errors}
              />

              <div className="bg-yellow-50 border border-yellow-300 p-3 rounded-md text-sm mt-4">
                <span className="font-semibold">{t('note')}</span>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-medium text-purple-800 mb-3">
              {t('signatureSection')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  {t('familySignature')}
                </h3>
                <FileUpload
                  id="familySignature"
                  label="uploadSignature"
                  onChange={(e) => handleFileChange(e, setFamilySignature)}
                  preview={familySignature.preview}
                />
                <div className="mt-3">
                  <InputField
                    label="sigName"
                    name="girlSignatureName"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="sigMobile"
                    name="girlSignatureMobile"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="sigRelation"
                    name="girlSignatureRelation"
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label="date"
                    name="girlSignatureDate"
                    type="date"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  {t('girlSignature')}
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
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow transition duration-300"
            >
              {t('submit')}
            </button>
          </div>

          {/* Success/Error Message */}
          {submitStatus === 'success' && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {t('success')}
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {t('error')}
            </div>
          )}
          {/* Form note */}
          <div className="text-center text-xs text-gray-500 mt-4">
            {t('note')}
          </div>
        </form>
      </div>
    </div>
  );
}
