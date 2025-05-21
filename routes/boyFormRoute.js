import multer from 'multer';
import express from 'express';
import { submitBoyForm } from '../controllers/boyFormController.js';
import BoyForm from '../models/boyFormModel.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Submission route with updated file fields
router.post(
  '/submit',
  upload.fields([
    // Basic photos
    { name: 'boyPhoto', maxCount: 1 },
    { name: 'girlPhoto', maxCount: 1 },
    { name: 'boySignature', maxCount: 1 },
    { name: 'familySignature', maxCount: 1 },

    // Required documents
    { name: 'aadharCard', maxCount: 1 },
    { name: 'marksheet', maxCount: 1 },
    { name: 'namdikashaForm', maxCount: 1 },
    { name: 'divorceCertificate', maxCount: 1 },
  ]),
  submitBoyForm
);

// Search by mobile number
router.get('/search', async (req, res) => {
  const { mobileNumber } = req.query;

  if (!mobileNumber) {
    return res.status(400).json({
      success: false,
      message: 'Mobile number is required',
    });
  }

  try {
    const boyData = await BoyForm.findOne({ mobileNumber });

    if (!boyData) {
      return res.status(404).json({
        success: false,
        message: 'No records found with this mobile number',
      });
    }

    return res.status(200).json({
      success: true,
      data: boyData,
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// Get all boy form data
router.get('/all', async (req, res) => {
  try {
    const allBoysForms = await BoyForm.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({
      success: true,
      count: allBoysForms.length,
      data: allBoysForms,
    });
  } catch (error) {
    console.error('Fetch all error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve data',
    });
  }
});

// Delete boy by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBoy = await BoyForm.findByIdAndDelete(req.params.id);

    if (!deletedBoy) {
      return res.status(404).json({
        success: false,
        message: 'Boy not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Boy deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete boy',
    });
  }
});

export default router;
