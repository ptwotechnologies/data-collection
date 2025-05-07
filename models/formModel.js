import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    jobType: { type: String, required: true },
    businessType: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    taluk: { type: String, required: true },
    jobDescription: { type: String },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

const Registration = mongoose.model('Registration', RegistrationSchema);
export default Registration;
