import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import MarriageCertificate from './MarriageCertificate'; // Adjust the import path as necessary
function App() {
  // Sample data for testing
  const sampleBoyData = {
    boyName: 'रमेश कुमार',
    boyDOB: '1995-05-15',
    boyFatherName: 'मोहन लाल',
    boyMotherName: 'गीता देवी',
    fullAddress: 'गाँव रामपुर, पोस्ट झांसी',
    tehsil: 'झांसी',
    district: 'झांसी',
    state: 'उत्तर प्रदेश',
    mobileNumber: '9876543210',
    firstNameReceiptDate: '2010-01-15',
    satnamReceiptDate: '2012-03-20',
    dateOfNameReceipt: '2015-06-10',
    abstractReceiptDate: '2018-09-25',
    isAdult: 'Yes',
    isDowryFree: 'Yes',
    agreeWithRules: 'Yes',
    isAlreadyMarried: 'No',
    boySignatureName: 'मोहन लाल',
    boySignatureMobile: '9876543210',
    boySignatureRelation: 'पिता',
  };

  const sampleGirlData = {
    girlName: 'सीमा देवी',
    girlDOB: '1998-08-20',
    girlFatherName: 'सुरेश चंद्र',
    girlMotherName: 'मीना देवी',
    fullAddress: 'गाँव कृष्णापुर, पोस्ट झांसी',
    tehsil: 'झांसी',
    district: 'झांसी',
    state: 'उत्तर प्रदेश',
    mobileNumber: '9876543211',
    firstNameReceiptDate: '2011-02-15',
    satnamReceiptDate: '2013-04-20',
    dateOfNameReceipt: '2016-07-10',
    abstractReceiptDate: '2019-10-25',
    isAdult: 'Yes',
    isDowryFree: 'Yes',
    agreeWithRules: 'Yes',
    isAlreadyMarried: 'No',
    girlSignatureName: 'सुरेश चंद्र',
    girlSignatureMobile: '9876543211',
    girlSignatureRelation: 'पिता',
  };

  return (
    <div style={{ height: '100vh' }}>
      <PDFViewer width="100%" height="100%">
        <MarriageCertificate
          boyData={sampleBoyData}
          girlData={sampleGirlData}
        />
      </PDFViewer>
    </div>
  );
}

export default App;
