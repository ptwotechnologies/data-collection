import mongoose from 'mongoose';

const GirlFormSchema = new mongoose.Schema({
    girlName: { type: String, required: true },
    girlFatherName: { type: String, required: true },
    girlMotherName: { type: String, required: true },
    girlDOB: { type: String, required: true },
    girlAge: { type: String, required: true },
    fullAddress: { type: String, required: true },
    tehsil: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    firstNameReceiptDate: { type: String, required: true },
    satnamReceiptDate: { type: String, required: true },
    dateOfNameReceipt: { type: String, required: true },
    abstractReceiptDate: { type: String, required: true },
    declarantName: { type: String, required: true },
    declarantSon: { type: String, required: true },
    declarantResident: { type: String, required: true },
    wantToMarry: { type: String, required: true },
    wantToMarryState: { type: String, required: true },
    childName: { type: String, required: true },
    childFrom: { type: String, required: true },
    childDistrict: { type: String, required: true },
    ramainSiriNo: { type: String, required: true },
    location: { type: String, required: true },
    dateOfRamaini: { type: String, required: true },
    isAdult: { type: String, default: 'No', required: true },
    isDowryFree: { type: String, default: 'No', required: true },
    agreeWithRules: { type: String, default: 'No', required: true },
    isAlreadyMarried: { type: String, default: 'No', required: true },
    girlSignatureName: { type: String, required: true },
    girlSignatureMobile: { type: String, required: true },
    girlSignatureRelation: { type: String, required: true },
    girlSignatureDate: { type: String, required: true },

    girlPhoto: { type: String },         // Optional
    boyPhoto: { type: String },          // Optional
    girlSignature: { type: String },     // Optional
    familySignature: { type: String },   // Optional
}, {
    timestamps: true
});

const GirlForm = mongoose.model('GirlForm', GirlFormSchema);
export default GirlForm;
