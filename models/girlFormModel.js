import mongoose from 'mongoose';

const GirlFormSchema = new mongoose.Schema(
  {
    // Personal Information
    girlName: { type: String, required: true },
    girlFatherName: { type: String, required: true },
    girlMotherName: { type: String, required: true },
    girlDOB: { type: String, required: true },
    girlAge: { type: String, required: true },

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
    girlSignatureName: { type: String, required: true },
    girlSignatureMobile: { type: String, required: true },
    girlSignatureRelation: { type: String, required: true },
    girlSignatureDate: { type: String, required: true },

    // Photos and Signatures (files)
    girlPhoto: { type: String },
    boyPhoto: { type: String },
    girlSignature: { type: String },
    familySignature: { type: String },
  },
  {
    timestamps: true,
  }
);
const GirlForm = mongoose.model('GirlForm', GirlFormSchema);
export default GirlForm;
