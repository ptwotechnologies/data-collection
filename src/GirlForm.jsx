import { useState, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export default function GirlForm() {
  const [formData, setFormData] = useState({
    girlName: '',
    girlFatherName: '',
    girlMotherName: '',
    girlDOB: '',
    girlAge: '',
    fullAddress: '',
    tehsil: '',
    district: '',
    state: '',
    mobileNumber: '',
    firstNameReceiptDate: '',
    satnamReceiptDate: '',
    dateOfNameReceipt: '',
    abstractReceiptDate: '',
    declarantName: '',
    declarantSon: '',
    declarantResident: '',
    wantToMarry: '',
    wantToMarryState: '',
    childName: '',
    childFrom: '',
    childDistrict: '',
    ramainSiriNo: '',
    location: '',
    dateOfRamaini: '',
    isAdult: 'No',
    isDowryFree: 'No',
    agreeWithRules: 'No',
    isAlreadyMarried: 'No',
    girlSignatureName: '',
    girlSignatureMobile: '',
    girlSignatureRelation: '',
    girlSignatureDate: '',
  });

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

  const printRef = useRef();
  const [isPdfMode, setIsPdfMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, setterFunction) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the file preview
      const previewUrl = URL.createObjectURL(file);
      // Update state with both file and preview URL
      setterFunction({ file, preview: previewUrl });
    }
  };

  /*   const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();

    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });

    if (girlPhoto) submissionData.append('girlPhoto', girlPhoto);
    if (boyPhoto) submissionData.append('boyPhoto', boyPhoto);
    if (girlSignature) submissionData.append('girlSignature', girlSignature);
    if (familySignature)
      submissionData.append('familySignature', familySignature);

    try {
      const response = await axios.post(
        'http://localhost:8888/api/girl/submit',
        submissionData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Form submitted successfully:', response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form.');
    }
  }; */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();

    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });

    if (girlPhoto.file) submissionData.append('girlPhoto', girlPhoto.file);
    if (boyPhoto.file) submissionData.append('boyPhoto', boyPhoto.file);
    if (girlSignature.file)
      submissionData.append('girlSignature', girlSignature.file);
    if (familySignature.file)
      submissionData.append('familySignature', familySignature.file);

    // Log each key-value in FormData
    for (let pair of submissionData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    alert('Form data logged in console.');
  };

  const handlePdfDownload = async () => {
    try {
      // Enter PDF mode to hide buttons
      setIsPdfMode(true);

      // Small delay to ensure render completes
      await new Promise((resolve) => setTimeout(resolve, 100));

      const element = printRef.current;

      // Use html2canvas-pro with enhanced options
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2,
        logging: false,
        allowTaint: true,
        backgroundColor: '#ffffff',

        // html2canvas-pro specific options
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,

        // Additional rendering improvements
        imageTimeout: 0,
        removeContainer: true,

        // Advanced rendering options
        renderOptions: {
          // Attempt to improve rendering of complex elements
          ignoreElements: (element) => {
            return (
              element.tagName === 'SCRIPT' ||
              element.tagName === 'LINK' ||
              element.classList.contains('ignore-pdf')
            );
          },

          // Optional: Improve image rendering
          onclone: (document) => {
            // Replace any problematic image sources
            const images = document.getElementsByTagName('img');
            for (let img of images) {
              if (img.src.startsWith('blob:')) {
                img.crossOrigin = 'Anonymous';
              }
            }
          },
        },
      });

      // Exit PDF mode
      setIsPdfMode(false);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });

      // Get PDF page dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate image dimensions to fit PDF
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const width = imgWidth * ratio;
      const height = imgHeight * ratio;

      // Center the image
      const x = (pdfWidth - width) / 2;
      const y = (pdfHeight - height) / 2;

      pdf.addImage(imgData, 'PNG', x, y, width, height);
      pdf.save('ramaini-registration-form.pdf');
    } catch (error) {
      // Ensure PDF mode is turned off in case of error
      setIsPdfMode(false);
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please check the console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-[#2a1533] p-4 flex justify-center">
      <div
        ref={printRef}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-5xl my-8"
      >
        <div className="text-center mb-6">
          <div className="bg-red-600 text-white py-2 px-4 rounded-lg inline-block mb-4">
            <div className="text-xl font-bold">Jai Purnabrahma Kabir Saheb</div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Ramaini (Marriage) Registration Form
          </h2>
          <div className="flex justify-center mt-2">
            <img
              src="https://placehold.co/150x50"
              alt="Decorative element"
              className="h-8"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="border-2 border-dashed border-purple-300 rounded-2xl w-32 h-36 flex flex-col items-center justify-center">
              <input
                type="file"
                id="girlPhoto"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setGirlPhoto)}
                className="hidden"
              />
              <label
                htmlFor="girlPhoto"
                className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-center text-sm text-gray-500 hover:bg-gray-50"
              >
                {girlPhoto.file ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={girlPhoto.preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <p>
                    Do not upload photo older than 1 month.
                    <br />
                    <span className="text-xs">
                      photo of girl
                      <br />
                      bride's photo
                    </span>
                  </p>
                )}
              </label>
            </div>

            <div className="flex-grow">
              <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">
                Girl's family information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <label className="w-1/2 text-sm font-medium text-gray-700">
                    Girl's Name:
                  </label>
                  <input
                    type="text"
                    name="girlName"
                    value={formData.girlName}
                    onChange={handleChange}
                    className="w-1/2 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/2 text-sm font-medium text-gray-700">
                    Girl's father's name:
                  </label>
                  <input
                    type="text"
                    name="girlFatherName"
                    value={formData.girlFatherName}
                    onChange={handleChange}
                    className="w-1/2 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/2 text-sm font-medium text-gray-700">
                    Girl's Mother's Name:
                  </label>
                  <input
                    type="text"
                    name="girlMotherName"
                    value={formData.girlMotherName}
                    onChange={handleChange}
                    className="w-1/2 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/3 text-sm font-medium text-gray-700">
                    Girl's date of birth:
                  </label>
                  <input
                    type="date"
                    name="girlDOB"
                    value={formData.girlDOB}
                    onChange={handleChange}
                    className="w-1/3 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
                  />
                  <label className="w-1/6 text-sm font-medium text-gray-700 ml-2">
                    age:
                  </label>
                  <input
                    type="number"
                    name="girlAge"
                    value={formData.girlAge}
                    onChange={handleChange}
                    className="w-1/6 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="border-2 border-dashed border-purple-300 rounded-2xl w-32 h-36 flex flex-col items-center justify-center">
              <input
                type="file"
                id="boyPhoto"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setBoyPhoto)}
                className="hidden"
              />
              <label
                htmlFor="boyPhoto"
                className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-center text-sm text-gray-500 hover:bg-gray-50"
              >
                {boyPhoto.file ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={boyPhoto.preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <p>
                    Do not upload photo older than 1 month.
                    <br />
                    <span className="text-xs">
                      boy's photo
                      <br />
                      groom's photo
                    </span>
                  </p>
                )}
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium text-gray-700">
                Full Address:
              </label>
              <input
                type="text"
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
                className="w-2/3 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium text-gray-700">
                Tehsil:
              </label>
              <input
                type="text"
                name="tehsil"
                value={formData.tehsil}
                onChange={handleChange}
                className="w-2/3 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium text-gray-700">
                District:
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-2/3 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium text-gray-700">
                State:
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-2/3 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium text-gray-700">
                Mobile Number:
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-2/3 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/2 text-sm font-medium text-gray-700">
                First name receipt date:
              </label>
              <input
                type="date"
                name="firstNameReceiptDate"
                value={formData.firstNameReceiptDate}
                onChange={handleChange}
                className="w-1/2 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium text-gray-700">
                Satnam receipt date:
              </label>
              <input
                type="date"
                name="satnamReceiptDate"
                value={formData.satnamReceiptDate}
                onChange={handleChange}
                className="w-2/3 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/2 text-sm font-medium text-gray-700">
                Date of receipt of name:
              </label>
              <input
                type="date"
                name="dateOfNameReceipt"
                value={formData.dateOfNameReceipt}
                onChange={handleChange}
                className="w-1/2 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 text-sm font-medium text-gray-700">
                Abstract receipt date:
              </label>
              <input
                type="date"
                name="abstractReceiptDate"
                value={formData.abstractReceiptDate}
                onChange={handleChange}
                className="w-2/3 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-baseline">
              <span className="text-sm mr-1">I am Mr./Mrs.</span>
              <input
                type="text"
                name="declarantName"
                value={formData.declarantName}
                onChange={handleChange}
                className="w-1/4 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm mx-1"
              />
              <span className="text-sm mr-1">Son/daughter:</span>
              <input
                type="text"
                name="declarantSon"
                value={formData.declarantSon}
                onChange={handleChange}
                className="w-1/4 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm mx-1"
              />
            </div>

            <div className="flex flex-wrap items-baseline">
              <span className="text-sm mr-1">Resident</span>
              <input
                type="text"
                name="declarantResident"
                value={formData.declarantResident}
                onChange={handleChange}
                className="w-1/4 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm mx-1"
              />
              <span className="text-sm mr-1">I want</span>
              <input
                type="text"
                name="wantToMarry"
                value={formData.wantToMarry}
                onChange={handleChange}
                className="w-1/6 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm mx-1"
              />
              <span className="text-sm mr-1">State</span>
              <input
                type="text"
                name="wantToMarryState"
                value={formData.wantToMarryState}
                onChange={handleChange}
                className="w-1/6 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm mx-1"
              />
              <span className="text-sm">to marry</span>
            </div>

            <div className="flex flex-wrap items-baseline">
              <span className="text-sm mr-1">
                I hereby declare that I my son / daughter
              </span>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                className="w-1/4 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm mx-1"
              />
            </div>

            <div className="flex flex-wrap items-baseline">
              <span className="text-sm mr-1">From</span>
              <input
                type="text"
                name="childFrom"
                value={formData.childFrom}
                onChange={handleChange}
                className="w-1/6 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm mx-1"
              />
              <span className="text-sm mr-1">district /</span>
              <input
                type="text"
                name="childDistrict"
                value={formData.childDistrict}
                onChange={handleChange}
                className="w-1/6 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm mx-1"
              />
              <span className="text-sm mr-1">Ramaini Siri No.</span>
              <input
                type="text"
                name="ramainSiriNo"
                value={formData.ramainSiriNo}
                onChange={handleChange}
                className="w-1/6 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm mx-1"
              />
              <span className="text-sm">the</span>
            </div>

            <div className="flex flex-wrap items-baseline">
              <span className="text-sm mr-1">
                Location: Nandar Center/Ashram.
              </span>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-1/4 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm mx-1"
              />
              <span className="text-sm mr-1">Ji's daughter / son on date</span>
              <input
                type="date"
                name="dateOfRamaini"
                value={formData.dateOfRamaini}
                onChange={handleChange}
                className="w-1/6 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm mx-1"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm mb-4">
              I am getting my daughter married (Ramaini) with my full consent. I
              assure that the bride and groom fulfill the age limit prescribed
              under the Indian Marriage Act, 1955 and all the necessary legal
              procedures have been followed for this marriage/Ramaini.
            </p>

            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-sm mr-4">
                  • Has your daughter attained the age of 18 years as per the
                  government rules?
                </span>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="isAdultYes"
                    name="isAdult"
                    value="Yes"
                    checked={formData.isAdult === 'Yes'}
                    onChange={handleRadioChange}
                    className="text-[#2a1533] focus:ring-[#2a1533]"
                  />
                  <label htmlFor="isAdultYes" className="text-sm">
                    Yes
                  </label>

                  <input
                    type="radio"
                    id="isAdultNo"
                    name="isAdult"
                    value="No"
                    checked={formData.isAdult === 'No'}
                    onChange={handleRadioChange}
                    className="ml-4 text-[#2a1533] focus:ring-[#2a1533]"
                  />
                  <label htmlFor="isAdultNo" className="text-sm">
                    No
                  </label>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-sm mr-4">
                  • Have both the parties decided to have a dowry free marriage
                  (Ramaini) keeping in mind their region, gotra etc.?
                </span>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="isDowryFreeYes"
                    name="isDowryFree"
                    value="Yes"
                    checked={formData.isDowryFree === 'Yes'}
                    onChange={handleRadioChange}
                    className="text-[#2a1533] focus:ring-[#2a1533]"
                  />
                  <label htmlFor="isDowryFreeYes" className="text-sm">
                    Yes
                  </label>

                  <input
                    type="radio"
                    id="isDowryFreeNo"
                    name="isDowryFree"
                    value="No"
                    checked={formData.isDowryFree === 'No'}
                    onChange={handleRadioChange}
                    className="ml-4 text-[#2a1533] focus:ring-[#2a1533]"
                  />
                  <label htmlFor="isDowryFreeNo" className="text-sm">
                    No
                  </label>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-sm mr-4">
                  • Do you agree with the rules of Ramaini marriage in Satlok
                  Ashram?
                </span>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="agreeWithRulesYes"
                    name="agreeWithRules"
                    value="Yes"
                    checked={formData.agreeWithRules === 'Yes'}
                    onChange={handleRadioChange}
                    className="text-[#2a1533] focus:ring-[#2a1533]"
                  />
                  <label htmlFor="agreeWithRulesYes" className="text-sm">
                    Yes
                  </label>

                  <input
                    type="radio"
                    id="agreeWithRulesNo"
                    name="agreeWithRules"
                    value="No"
                    checked={formData.agreeWithRules === 'No'}
                    onChange={handleRadioChange}
                    className="ml-4 text-[#2a1533] focus:ring-[#2a1533]"
                  />
                  <label htmlFor="agreeWithRulesNo" className="text-sm">
                    No
                  </label>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-sm mr-4">
                  • Is the girl already married?
                </span>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="isAlreadyMarriedYes"
                    name="isAlreadyMarried"
                    value="Yes"
                    checked={formData.isAlreadyMarried === 'Yes'}
                    onChange={handleRadioChange}
                    className="text-[#2a1533] focus:ring-[#2a1533]"
                  />
                  <label htmlFor="isAlreadyMarriedYes" className="text-sm">
                    Yes
                  </label>

                  <input
                    type="radio"
                    id="isAlreadyMarriedNo"
                    name="isAlreadyMarried"
                    value="No"
                    checked={formData.isAlreadyMarried === 'No'}
                    onChange={handleRadioChange}
                    className="ml-4 text-[#2a1533] focus:ring-[#2a1533]"
                  />
                  <label htmlFor="isAlreadyMarriedNo" className="text-sm">
                    No
                  </label>
                </div>
              </div>

              <p className="text-sm text-gray-600 italic">
                (If yes then it is mandatory to attach the divorce papers with
                the form, otherwise Ramani will not be done.)
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm mb-4">
              I also declare that the above information given by me is true,
              complete and correct. If any error or incorrectness is found in my
              declaration, I will be fully responsible for it.
            </p>

            <div className="bg-red-100 border border-red-300 p-3 rounded-md text-sm">
              <span className="font-semibold">Note:</span> Aadhaar card of boy
              and girl and parents, photocopy of Namdiksha form, 10th mark sheet
              and photo of both are mandatory to be attached with the form.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
            <div className="space-y-4">
              <div className="border-b border-gray-300 pb-2">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Signature of the girl's family
                </h3>
                <input
                  type="file"
                  id="familySignature"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setFamilySignature)}
                  className="hidden"
                />
                <label
                  htmlFor="familySignature"
                  className="cursor-pointer flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {familySignature.file ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={familySignature.preview}
                        alt="Family Signature Preview"
                        className="h-full object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Click to upload signature
                    </p>
                  )}
                </label>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <label className="w-1/3 text-sm font-medium text-gray-700">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="girlSignatureName"
                    value={formData.girlSignatureName}
                    onChange={handleChange}
                    className="w-2/3 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/3 text-sm font-medium text-gray-700">
                    Mobile Number:
                  </label>
                  <input
                    type="tel"
                    name="girlSignatureMobile"
                    value={formData.girlSignatureMobile}
                    onChange={handleChange}
                    className="w-2/3 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/3 text-sm font-medium text-gray-700">
                    Relationship with girl:
                  </label>
                  <input
                    type="text"
                    name="girlSignatureRelation"
                    value={formData.girlSignatureRelation}
                    onChange={handleChange}
                    className="w-2/3 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/3 text-sm font-medium text-gray-700">
                    Date:
                  </label>
                  <input
                    type="date"
                    name="girlSignatureDate"
                    value={formData.girlSignatureDate}
                    onChange={handleChange}
                    className="w-2/3 border-b border-gray-300 focus:border-[#2a1533] focus:ring-0 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-b border-gray-300 pb-2">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Signature of the girl (bride)
                </h3>
                <input
                  type="file"
                  id="girlSignature"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setGirlSignature)}
                  className="hidden"
                />
                <label
                  htmlFor="girlSignature"
                  className="cursor-pointer flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {girlSignature.file ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={girlSignature.preview}
                        alt="Girl Signature Preview"
                        className="h-full object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Click to upload signature
                    </p>
                  )}
                </label>
              </div>
            </div>
          </div>

          {!isPdfMode && (
            <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={handlePdfDownload}
                className="px-8 cursor-pointer py-3 bg-amber-500 hover:bg-amber-600 text-[#2a1533] font-bold rounded-lg shadow-lg mr-4"
              >
                Download PDF
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-8 cursor-pointer py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg"
              >
                Submit Registration
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
