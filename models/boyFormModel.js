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

    // Religious Information (optional)
    firstNameReceiptDate: { type: String },
    satnamReceiptDate: { type: String },
    dateOfNameReceipt: { type: String },
    abstractReceiptDate: { type: String },

    // Declaration Information
    declarantSon: { type: String, required: true },
    childFrom: { type: String, required: true },
    ramainSiriNo: { type: String },
    location: { type: String, required: true },
    dateOfRamaini: { type: String, required: true },
    generatedDeclaration: { type: String },

    // Important Questions
    isAdult: { type: String, required: true },
    isDowryFree: { type: String, required: true },
    agreeWithRules: { type: String, required: true },
    isAlreadyMarried: { type: String, required: true },

    // File uploads
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
