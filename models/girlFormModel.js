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
    boymobileNumber: { type: String },

    // Religious Information (optional)
    firstNameReceiptDate: { type: String },
    satnamReceiptDate: { type: String },
    dateOfNameReceipt: { type: String },
    abstractReceiptDate: { type: String },

    // Declaration Information
    declarantSon: { type: String, required: true },
    childFrom: { type: String, required: true },
    ramainSiriNo: { type: String, required: true },
    location: { type: String, required: true },
    dateOfRamaini: { type: String, required: true },
    generatedDeclaration: { type: String },

    // Important Questions
    isAdult: { type: String, required: true },
    isDowryFree: { type: String, required: true },
    agreeWithRules: { type: String, required: true },
    isAlreadyMarried: { type: String, required: true },

    // File uploads - Basic photos
    girlPhoto: { type: String },
    boyPhoto: { type: String },
    girlSignature: { type: String },
    familySignature: { type: String },

    // New document uploads
    aadharCard: { type: String, required: true },
    marksheet: { type: String, required: true },
    namdikashaForm: { type: String }, // Optional
    divorceCertificate: { type: String }, // Required only if isAlreadyMarried is "Yes"
  },
  {
    timestamps: true,
  }
);

// Custom validation for divorce certificate
GirlFormSchema.pre('validate', function (next) {
  if (this.isAlreadyMarried === 'Yes' && !this.divorceCertificate) {
    this.invalidate(
      'divorceCertificate',
      'Divorce certificate is required for previously married individuals'
    );
  }
  next();
});

const GirlForm = mongoose.model('GirlForm', GirlFormSchema);
export default GirlForm;
