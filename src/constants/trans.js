// Create a new unified i18n.js file that combines both girl and boy translations
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18n with namespaces
i18n.use(initReactI18next).init({
  resources: {
    en: {
      // Common translations shared by both forms
      common: {
        title: 'Ramaini (Marriage) Registration Form',
        subtitle: 'Glory to Bandichhod Satguru Rampal Ji Maharaj',
        personalInfo: 'Personal Information',
        contactInfo: 'Contact Information',
        fullAddress: 'Full Address',
        tehsil: 'Tehsil',
        district: 'District',
        state: 'State',
        divorceWarning:
          '(If yes then it is mandatory to attach the divorce papers with the form, otherwise Ramaini will not be done.)',
        mobileNumber: 'Mobile Number',
        religiousInfo: 'Religious Information',
        firstNameReceiptDate: 'Pratham Naam Date',
        satnamReceiptDate: 'Satnam Date',
        nameReceiptDate: 'Saarnam Date',
        abstractReceiptDate: 'Saar Shabd Date',
        declarantInfo:
          'I am {{name}}, {{relation}} of {{resident}}, wanting {{person}} from {{state}} to marry.',
        marriageDetails: 'Marriage Details',
        childName: "Child's Name",
        childDistrict: 'Child District',
        ramainiSiriNo: 'Ramaini Siri No.',
        location: 'Location',
        dateOfRamaini: 'Date of Ramaini',
        questions: 'Important Questions',
        isDowryFree: 'Is this a dowry-free marriage?',
        agreeWithRules: 'Do you agree with the rules of Ramaini marriage?',
        note: 'Note: Aadhaar card of male and female and parents, photocopy of Namdiksha form, 10th mark sheet and photos are mandatory.',
        signatureSection: 'Signatures',
        familySignature: 'Family Signature',
        sigName: 'Name',
        sigMobile: 'Mobile',
        sigRelation: 'Relationship with person',
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
        acceptDeclaration: 'I accept and agree to the declaration',
        declarationDetails: 'Declaration Details',
        declarantSon: 'Declarant Son/Daughter of',
        ramainSiriNo: 'Ramaini Siri No.',
        generateDeclaration: 'Generate Declaration',
        generatedDeclaration: 'Generated Declaration:',
        acceptFinalDeclaration:
          'I accept and agree to the above declaration. All the information provided is true and correct to the best of my knowledge.',
        editDeclarationDetails: 'Edit Declaration Details',
        requiredDocuments: 'Required Documents',
        aadharCard: 'Aadhar Card',
        aadharCardDesc: 'Upload a clear scan or photo of the Aadhar Card',
        marksheet: '10th Class Marksheet',
        marksheetDesc:
          'Upload a clear scan or photo of the 10th Class Marksheet',
        namdikashaForm: 'Namdikasha Form',
        namdikashaFormDesc: 'Upload the Namdikasha form if available',
        divorceCertificate: 'Divorce Certificate',
        divorceCertificateDesc: 'Upload a legally valid divorce certificate',
        documentGuidelines: 'Document Guidelines',
        docGuidelinesClear:
          'All documents must be clearly visible and readable',
        required: 'Required',
        docGuidelinesSize: 'Files must be less than 5MB in size',
        docGuidelinesFormat: 'Accepted formats: JPG, PNG, or PDF',
        docGuidelinesNoEdit: 'Do not submit edited or manipulated documents',
        docGuidelinesDivorce:
          'Divorce certificate must be legally valid and issued by a competent authority',
        allDocumentsReadable:
          'All documents must be clearly visible and readable',
        fileSizeLimit: 'Files must be less than 5MB in size',
        acceptedFormats: 'Accepted formats: JPG, PNG, or PDF',
        noEditedDocs: 'Do not submit edited or manipulated documents',
        divorceCertValid:
          'Divorce certificate must be legally valid and issued by a competent authority',
        uploadRequiredDocs:
          'Please upload all required documents before submitting',
        girlPhotoLabel: "Girl's Photo (Bride's Photo)", // Hindi: "लड़की का फोटो (दुल्हन का फोटो)"
        boyPhotoLabel: "Boy's Photo (Groom's Photo)", // Hindi: "लड़के का फोटो (दूल्हे का फोटो)"
        photoAgeWarning: 'Do not upload photo older than 1 month.', // Hindi: "1 महीने से पुराना फोटो अपलोड न करें।"
        girlPhotoText: 'Photo of girl', // Hindi: "लड़की का फोटो"
        boyPhotoText: "Boy's photo", // Hindi: "लड़के का फोटो"
        clickToUpload: 'Click to upload document', // Hindi: "दस्तावेज़ अपलोड करने के लिए क्लिक करें"
        fileSizeInfo: 'JPG, PNG or PDF (max 5MB)', // Hindi: "JPG, PNG या PDF (अधिकतम 5MB)"
        girlFamilyInfo: "Girl's family information", // Hindi: "लड़की के परिवार की जानकारी"
        boyFamilyInfo: "Boy's family information", // Hindi: "लड़के के परिवार की जानकारी"
        requiredDocumentsHeader: 'Required Documents:',
        selfDeclaration: 'Self Declaration',
        selfDeclarationDetails:
          'I wish to marry with full consent and following all legal requirements.',
        selfDeclarantInfo:
          'I am {{name}}, son/daughter of {{fatherName}}, wanting to marry with the consent of {{childFrom}}.',
        declaration: {
          intro:
            'I am {{name}}, {{relation}} of {{parentName}}, resident of {{address}}, {{district}}, {{state}}.',
          consent:
            'I hereby declare that I wish to marry with the consent of {{guardianName}} from {{guardianDistrict}} district and will perform Ramaini Siri No. {{siriNo}} at Location: {{location}} on date {{date}}.',
          ageAssurance:
            'I am getting married (Ramaini) with my full consent. I assure that both parties fulfill the age limit prescribed under the Indian Marriage Act, 1955 and all the necessary legal procedures have been followed for this marriage/Ramaini.',
          truthStatement:
            'I also declare that the above information given by me is true, complete and correct. If any error or incorrectness is found in my declaration, I will be fully responsible for it.',
        },
      },

      // Girl-specific translations
      girl: {
        name: 'Name',
        fatherName: "Father's Name",
        motherName: "Mother's Name",
        dob: 'Date of Birth',
        age: 'Age',
        signature: 'Signature',
        boyMobileNumber: "Boy's Mobile Number",
        childFrom: "Boy's Father/Guardian Name",
        isAdult:
          'Has the female attained the age of 18 years as per government rules?',
        isAlreadyMarried: 'Is the person already married?',
      },

      // Boy-specific translations
      boy: {
        name: 'Name',
        fatherName: "Father's Name",
        motherName: "Mother's Name",
        dob: 'Date of Birth',
        age: 'Age',
        signature: 'Signature',
        girlMobileNumber: "Girl's Mobile Number",
        childFrom: "Girl's Father/Guardian Name",
        isAdult:
          'Has the person attained the age of 21 years as per government rules?',
        isAlreadyMarried: 'Is the person already married?',
      },
    },

    hi: {
      // Hindi common translations - replace the content in your i18n.js file
      common: {
        title: 'रमैनी (विवाह) पंजीकरण प्रपत्र',
        subtitle: 'बंदी छोड़ सतगुरु रामपाल जी महाराज की जय',
        personalInfo: 'व्यक्तिगत जानकारी',
        contactInfo: 'संपर्क जानकारी',
        fullAddress: 'पूरा पता',
        tehsil: 'तहसील',
        district: 'जिला',
        required: 'आवश्यक',
        girlPhotoLabel: 'लड़की का फोटो (दुल्हन का फोटो)',
        boyPhotoLabel: 'लड़के का फोटो (दूल्हे का फोटो)',
        photoAgeWarning: '1 महीने से पुराना फोटो अपलोड न करें।',
        girlPhotoText: 'लड़की का फोटो',
        boyPhotoText: 'लड़के का फोटो',
        clickToUpload: 'दस्तावेज़ अपलोड करने के लिए क्लिक करें',
        fileSizeInfo: 'JPG, PNG या PDF (अधिकतम 5MB)',
        girlFamilyInfo: 'लड़की के परिवार की जानकारी',
        boyFamilyInfo: 'लड़के के परिवार की जानकारी',
        requiredDocumentsHeader: 'आवश्यक दस्तावेज़:',
        divorceWarning:
          '(यदि हां, तो रमैनी नहीं की जाएगी।) रमैनी के साथ तलाक के कागजात को फॉर्म के साथ संलग्न करना अनिवार्य है।',
        state: 'राज्य',
        mobileNumber: 'मोबाइल नंबर',
        religiousInfo: 'धार्मिक जानकारी',
        firstNameReceiptDate: 'प्रथम नाम तिथि',
        satnamReceiptDate: 'सतनाम तिथि',
        nameReceiptDate: 'सारनाम तिथि',
        abstractReceiptDate: 'सार शब्द तिथि',
        declarantInfo:
          'मैं {{name}}, {{resident}} का {{relation}}, {{state}} से {{person}} से विवाह करना चाहता हूं।',
        marriageDetails: 'विवाह विवरण',
        childName: 'बच्चे का नाम',
        childDistrict: 'बच्चे का जिला',
        ramainiSiriNo: 'रमैनी सिरी नंबर',
        location: 'स्थान',
        dateOfRamaini: 'रमैनी की तिथि',
        questions: 'महत्वपूर्ण प्रश्न',
        isDowryFree: 'क्या यह दहेज-मुक्त विवाह है?',
        agreeWithRules: 'क्या आप रमैनी विवाह के नियमों से सहमत हैं?',
        note: 'नोट: लड़के और लड़की और माता-पिता का आधार कार्ड, नामदीक्षा फॉर्म की फोटोकॉपी, 10वीं की मार्कशीट और फोटो अनिवार्य हैं।',
        signatureSection: 'हस्ताक्षर',
        familySignature: 'परिवार का हस्ताक्षर',
        sigName: 'नाम',
        sigMobile: 'मोबाइल',
        sigRelation: 'व्यक्ति के साथ संबंध',
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
        acceptDeclaration: 'मैं घोषणा को स्वीकार करता हूं और सहमत हूं',
        declarationDetails: 'घोषणा विवरण',
        declarantSon: 'घोषणाकर्ता के पिता का नाम',
        ramainSiriNo: 'रमैनी सिरी नंबर',
        generateDeclaration: 'घोषणा उत्पन्न करें',
        generatedDeclaration: 'उत्पन्न घोषणा:',
        acceptFinalDeclaration:
          'मैं उपरोक्त घोषणा को स्वीकार करता हूं और उससे सहमत हूं। मेरे द्वारा दी गई सभी जानकारी मेरे ज्ञान के अनुसार सत्य, पूर्ण और सही है।',
        editDeclarationDetails: 'घोषणा विवरण संपादित करें',
        requiredDocuments: 'आवश्यक दस्तावेज',
        aadharCard: 'आधार कार्ड',
        aadharCardDesc: 'आधार कार्ड की स्पष्ट स्कैन या फोटो अपलोड करें',
        marksheet: '10वीं कक्षा की मार्कशीट',
        marksheetDesc:
          '10वीं कक्षा की मार्कशीट की स्पष्ट स्कैन या फोटो अपलोड करें',
        namdikashaForm: 'नामदीक्षा फॉर्म',
        namdikashaFormDesc: 'यदि उपलब्ध हो तो नामदीक्षा फॉर्म अपलोड करें',
        divorceCertificate: 'तलाक प्रमाणपत्र',
        divorceCertificateDesc:
          'कानूनी रूप से मान्य तलाक प्रमाणपत्र अपलोड करें',
        documentGuidelines: 'दस्तावेज़ दिशानिर्देश',
        docGuidelinesClear:
          'सभी दस्तावेज स्पष्ट रूप से दिखाई देने और पढ़ने योग्य होने चाहिए',
        docGuidelinesSize: 'फ़ाइलें 5MB से कम आकार की होनी चाहिए',
        docGuidelinesFormat: 'स्वीकृत प्रारूप: JPG, PNG या PDF',
        docGuidelinesNoEdit: 'संपादित या हेरफेर किए गए दस्तावेज़ जमा न करें',
        docGuidelinesDivorce:
          'तलाक प्रमाणपत्र कानूनी रूप से मान्य और सक्षम प्राधिकारी द्वारा जारी किया गया होना चाहिए',
        allDocumentsReadable:
          'सभी दस्तावेज स्पष्ट रूप से दिखाई देने और पढ़ने योग्य होने चाहिए',
        fileSizeLimit: 'फ़ाइलें 5MB से कम आकार की होनी चाहिए',
        acceptedFormats: 'स्वीकृत प्रारूप: JPG, PNG या PDF',
        noEditedDocs: 'संपादित या हेरफेर किए गए दस्तावेज़ जमा न करें',
        divorceCertValid:
          'तलाक प्रमाणपत्र कानूनी रूप से मान्य और सक्षम प्राधिकारी द्वारा जारी किया गया होना चाहिए',
        uploadRequiredDocs:
          'कृपया जमा करने से पहले सभी आवश्यक दस्तावेज अपलोड करें',
        selfDeclaration: 'स्वयं की घोषणा',
        selfDeclarationDetails:
          'मैं पूरी सहमति और सभी कानूनी आवश्यकताओं का पालन करते हुए शादी करना चाहता/चाहती हूँ।',
        selfDeclarantInfo:
          'मैं {{name}}, {{fatherName}} का पुत्र/पुत्री, {{childFrom}} की सहमति से विवाह करना चाहता/चाहती हूँ।',
        declaration: {
          intro:
            'मैं {{name}}, {{parentName}} {{relation}}, निवासी {{address}}, {{district}}, {{state}} हूँ।',
          consent:
            'मैं एतद्द्वारा घोषणा करता/करती हूँ कि मैं {{guardianDistrict}} जिले के {{guardianName}} की सहमति से विवाह करना चाहता/चाहती हूँ और स्थान: {{location}} पर दिनांक {{date}} को रमैनी सिरी नंबर {{siriNo}} का आयोजन करूँगा/करूँगी।',
          ageAssurance:
            'मैं अपनी पूरी सहमति से विवाह (रमैनी) कर रहा/रही हूँ। मैं आश्वासन देता/देती हूँ कि दोनों पक्ष भारतीय विवाह अधिनियम, 1955 के तहत निर्धारित आयु सीमा को पूरा करते हैं और इस विवाह/रमैनी के लिए सभी आवश्यक कानूनी प्रक्रियाओं का पालन किया गया है।',
          truthStatement:
            'मैं यह भी घोषणा करता/करती हूँ कि मेरे द्वारा दी गई उपरोक्त जानकारी सत्य, पूर्ण और सही है। यदि मेरी घोषणा में कोई त्रुटि या गलती पाई जाती है, तो मैं इसके लिए पूरी तरह से जिम्मेदार होऊंगा/होऊंगी।',
        },
      },

      // Hindi girl-specific translations
      girl: {
        name: 'नाम',
        fatherName: 'पिता का नाम',
        motherName: 'माता का नाम',
        dob: 'जन्म तिथि',
        age: 'आयु',
        signature: 'हस्ताक्षर',
        boyMobileNumber: 'लड़के का मोबाइल नंबर',
        childFrom: 'लड़के के पिता/अभिभावक का नाम',
        isAdult:
          'क्या व्यक्ति सरकारी नियमों के अनुसार 18 वर्ष की आयु प्राप्त कर चुका है?',
        isAlreadyMarried: 'क्या व्यक्ति पहले से विवाहित है?',
      },

      // Hindi boy-specific translations
      boy: {
        name: 'नाम',
        fatherName: 'पिता का नाम',
        motherName: 'माता का नाम',
        dob: 'जन्म तिथि',
        age: 'आयु',
        signature: 'हस्ताक्षर',
        girlMobileNumber: 'लड़की का मोबाइल नंबर',
        childFrom: 'लड़की के पिता/अभिभावक का नाम',
        isAdult:
          'क्या लड़का सरकारी नियमों के अनुसार 21 वर्ष की आयु प्राप्त कर चुका है?',
        isAlreadyMarried: 'क्या व्यक्ति पहले से विवाहित है?',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common', 'boy', 'girl'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
