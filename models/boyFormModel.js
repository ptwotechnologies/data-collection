import mongoose from 'mongoose';

const BoyFormSchema = new mongoose.Schema(
  {
    // Personal Information
    boyName: { type: String, required: true },
    boyFatherName: { type: String, required: true },
    boyMotherName: { type: String, required: true },
    boyDOB: { type: String, required: true },
    boyAge: { type: String, required: true },

    // Contact Information
    fullAddress: { type: String, required: true },
    tehsil: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    mobileNumber: { type: String, required: true },

    // Religious Information
    firstNameReceiptDate: { type: String },
    satnamReceiptDate: { type: String },
    dateOfNameReceipt: { type: String },
    abstractReceiptDate: { type: String },

    // Declaration Information
    declarantName: { type: String, required: true },
    declarantSon: { type: String, required: true },
    declarantResident: { type: String, required: true },
    wantToMarry: { type: String, required: true },
    wantToMarryState: { type: String, required: true },
    acceptDeclaration: { type: Boolean, required: true, default: false },

    // Marriage Details
    childName: { type: String, required: true },
    childFrom: { type: String },
    childDistrict: { type: String },
    ramainSiriNo: { type: String },
    location: { type: String, required: true },
    dateOfRamaini: { type: String, required: true },

    // Important Questions
    isAdult: { type: String, default: 'No', required: true },
    isDowryFree: { type: String, default: 'No', required: true },
    agreeWithRules: { type: String, default: 'No', required: true },
    isAlreadyMarried: { type: String, default: 'No', required: true },

    // Signatures
    boySignatureName: { type: String, required: true },
    boySignatureMobile: { type: String, required: true },
    boySignatureRelation: { type: String, required: true },
    boySignatureDate: { type: String, required: true },

    // Photos and Signatures (files)
    boyPhoto: { type: String },
    girlPhoto: { type: String },
    boySignature: { type: String },
    familySignature: { type: String },
  },
  {
    timestamps: true,
  }
);
const BoyForm = mongoose.model('BoyForm', BoyFormSchema);
export default BoyForm;
