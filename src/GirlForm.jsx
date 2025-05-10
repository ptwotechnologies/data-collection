import { useState } from 'react';
import axios from 'axios';

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

  const [girlPhoto, setGirlPhoto] = useState(null);
  const [boyPhoto, setBoyPhoto] = useState(null);
  const [girlSignature, setGirlSignature] = useState(null);
  const [familySignature, setFamilySignature] = useState(null);

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
      setterFunction(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();

    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });

    if (girlPhoto) submissionData.append('girlPhoto', girlPhoto);
    if (boyPhoto) submissionData.append('boyPhoto', boyPhoto);
    if (girlSignature) submissionData.append('girlSignature', girlSignature);
    if (familySignature) submissionData.append('familySignature', familySignature);

    try {
      const response = await axios.post('http://localhost:8888/api/girl/submit', submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Form submitted successfully:', response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form.');
    }
  };


  return (
    <div className="min-h-screen bg-[#2a1533] p-4 flex justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-[1200px] my-8">
        <div className="text-center mb-6">
          <div className="bg-red-600 text-white py-2 px-4 rounded-lg inline-block mb-4">
            <h1 className="text-xl font-bold">Jai Purnabrahma Kabir Saheb</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Ramaini (Marriage) Registration Form
          </h2>
          <div className="flex justify-center mt-2">
            <img
              src="/api/placeholder/100/50"
              alt="Decorative element"
              className="h-8"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className=" border-2 border-dashed  border-purple-300 rounded-2xl w-32 h-36 flex flex-col items-center justify-center">
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
                {girlPhoto ? (
                  <div className="text-center">
                    <p className="text-green-600 font-medium">Photo selected</p>
                    <p className="text-xs">{girlPhoto.name}</p>
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
                {boyPhoto ? (
                  <div className="text-center">
                    <p className="text-green-600 font-medium">Photo selected</p>
                    <p className="text-xs">{boyPhoto.name}</p>
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
                  {familySignature ? (
                    <div className="text-center">
                      <p className="text-green-600 font-medium">
                        Signature uploaded
                      </p>
                      <p className="text-xs">{familySignature.name}</p>
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
                  {girlSignature ? (
                    <div className="text-center">
                      <p className="text-green-600 font-medium">
                        Signature uploaded
                      </p>
                      <p className="text-xs">{girlSignature.name}</p>
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

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-8 cursor-pointer py-3 bg-amber-500 hover:bg-amber-600 text-[#2a1533] font-bold rounded-lg shadow-lg"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
