import GirlForm from '../models/girlFormModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const submitGirlForm = async (req, res) => {
  try {
    console.log('Form submission started...');
    const formData = req.body;

    // File upload handling with parallel uploads
    const girlPhoto = req.files?.girlPhoto?.[0]?.buffer;
    const boyPhoto = req.files?.boyPhoto?.[0]?.buffer;
    const girlSignature = req.files?.girlSignature?.[0]?.buffer;
    const familySignature = req.files?.familySignature?.[0]?.buffer;

    // Document file uploads
    const aadharCard = req.files?.aadharCard?.[0]?.buffer;
    const marksheet = req.files?.marksheet?.[0]?.buffer;
    const namdikashaForm = req.files?.namdikashaForm?.[0]?.buffer;
    const divorceCertificate = req.files?.divorceCertificate?.[0]?.buffer;

    // Upload files to Cloudinary in parallel to improve performance
    const uploadPromises = [];

    // Original file uploads
    if (girlPhoto) {
      uploadPromises.push(
        uploadOnCloudinary(girlPhoto).then((url) => ({ key: 'girlPhoto', url }))
      );
    }
    if (boyPhoto) {
      uploadPromises.push(
        uploadOnCloudinary(boyPhoto).then((url) => ({ key: 'boyPhoto', url }))
      );
    }
    if (girlSignature) {
      uploadPromises.push(
        uploadOnCloudinary(girlSignature).then((url) => ({
          key: 'girlSignature',
          url,
        }))
      );
    }
    if (familySignature) {
      uploadPromises.push(
        uploadOnCloudinary(familySignature).then((url) => ({
          key: 'familySignature',
          url,
        }))
      );
    }

    // Document uploads
    if (aadharCard) {
      uploadPromises.push(
        uploadOnCloudinary(aadharCard).then((url) => ({
          key: 'aadharCard',
          url,
        }))
      );
    }
    if (marksheet) {
      uploadPromises.push(
        uploadOnCloudinary(marksheet).then((url) => ({ key: 'marksheet', url }))
      );
    }
    if (namdikashaForm) {
      uploadPromises.push(
        uploadOnCloudinary(namdikashaForm).then((url) => ({
          key: 'namdikashaForm',
          url,
        }))
      );
    }
    if (divorceCertificate) {
      uploadPromises.push(
        uploadOnCloudinary(divorceCertificate).then((url) => ({
          key: 'divorceCertificate',
          url,
        }))
      );
    }

    // Wait for all uploads to complete
    if (uploadPromises.length > 0) {
      console.log(`Uploading ${uploadPromises.length} files...`);
      const uploadResults = await Promise.all(uploadPromises);

      // Apply upload results to formData
      uploadResults.forEach((result) => {
        formData[result.key] = result.url;
      });
      console.log('File uploads completed');
    }

    // Save to MongoDB
    console.log('Saving to database...');
    const newForm = await GirlForm.create(formData);
    console.log('Form saved successfully');

    // Send response immediately
    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: {
        id: newForm._id,
        girlName: newForm.girlName,
        submittedAt: newForm.createdAt,
      },
    });
  } catch (error) {
    console.error('Form submission error:', error);

    // Send detailed error response
    res.status(500).json({
      success: false,
      error: 'Failed to submit form',
      message: error.message,
    });
  }
};
