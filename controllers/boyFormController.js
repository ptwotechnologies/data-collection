import BoyForm from '../models/boyFormModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const submitBoyForm = async (req, res) => {
  try {
    console.log('Form submission started...');
    const formData = req.body;

    // Initialize uploadPromises array before using it
    const uploadPromises = [];

    // File upload handling with parallel uploads
    const boyPhoto = req.files?.boyPhoto?.[0]?.buffer;
    const girlPhoto = req.files?.girlPhoto?.[0]?.buffer;
    const boySignature = req.files?.boySignature?.[0]?.buffer;
    const familySignature = req.files?.familySignature?.[0]?.buffer;
    const aadharCard = req.files?.aadharCard?.[0]?.buffer;
    const marksheet = req.files?.marksheet?.[0]?.buffer;
    const namdikashaForm = req.files?.namdikashaForm?.[0]?.buffer;
    const divorceCertificate = req.files?.divorceCertificate?.[0]?.buffer;

    // Add basic photos to upload promises
    if (boyPhoto) {
      uploadPromises.push(
        uploadOnCloudinary(boyPhoto).then((url) => ({ key: 'boyPhoto', url }))
      );
    }
    if (girlPhoto) {
      uploadPromises.push(
        uploadOnCloudinary(girlPhoto).then((url) => ({ key: 'girlPhoto', url }))
      );
    }
    if (boySignature) {
      uploadPromises.push(
        uploadOnCloudinary(boySignature).then((url) => ({
          key: 'boySignature',
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

    // Add documents to upload promises
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
    const newForm = await BoyForm.create(formData);
    console.log('Form saved successfully');

    // Send response immediately
    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: {
        id: newForm._id,
        boyName: newForm.boyName,
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
