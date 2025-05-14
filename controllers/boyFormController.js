import BoyForm from '../models/boyFormModel.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const submitBoyForm = async (req, res) => {
  try {
    const formData = req.body;

    // File upload handling (if files are included)
    const boyPhoto = req.files?.boyPhoto?.[0]?.buffer;
    const girlPhoto = req.files?.girlPhoto?.[0]?.buffer;
    const boySignature = req.files?.boySignature?.[0]?.buffer;
    const familySignature = req.files?.familySignature?.[0]?.buffer;

    // Upload to Cloudinary if files are present
    if (boyPhoto) {
      formData.boyPhoto = await uploadOnCloudinary(boyPhoto);
    }
    if (girlPhoto) {
      formData.girlPhoto = await uploadOnCloudinary(girlPhoto);
    }
    if (boySignature) {
      formData.boySignature = await uploadOnCloudinary(boySignature);
    }
    if (familySignature) {
      formData.familySignature = await uploadOnCloudinary(familySignature);
    }

    // Save to MongoDB
    const newForm = await BoyForm.create(formData);

    res.status(201).json({
      message: "Form submitted successfully",
      data: newForm,
    });
  } catch (error) {
    console.error("Form submission error:", error);
    res.status(500).json({ error: "Failed to submit form" });
  }
};
