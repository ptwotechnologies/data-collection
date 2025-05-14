import GirlForm from '../models/girlFormModel.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js"; 

export const submitGirlForm = async (req, res) => {
  try {
    const formData = req.body;
    

    // File upload handling (if files are included)
    const girlPhoto = req.files?.girlPhoto?.[0]?.buffer;
    const boyPhoto = req.files?.boyPhoto?.[0]?.buffer;
    const girlSignature = req.files?.girlSignature?.[0]?.buffer;
    const familySignature = req.files?.familySignature?.[0]?.buffer;

    // Upload to Cloudinary if files are present
    if (girlPhoto) {
      formData.girlPhoto = await uploadOnCloudinary(girlPhoto);
    }
    if (boyPhoto) {
      formData.boyPhoto = await uploadOnCloudinary(boyPhoto);
    }
    if (girlSignature) {
      formData.girlSignature = await uploadOnCloudinary(girlSignature);
    }
    if (familySignature) {
      formData.familySignature = await uploadOnCloudinary(familySignature);
    }

    // Save to MongoDB
    const newForm = await GirlForm.create(formData);

    res.status(201).json({
      message: "Form submitted successfully",
      data: newForm,
    });
  } catch (error) {
    console.error("Form submission error:", error);
    res.status(500).json({ error: "Failed to submit form" });
  }
};
