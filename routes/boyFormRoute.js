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

// Existing submission route
router.post(
  '/submit',
  upload.fields([
    { name: 'boyPhoto', maxCount: 1 },
    { name: 'girlPhoto', maxCount: 1 },
    { name: 'boySignature', maxCount: 1 },
    { name: 'familySignature', maxCount: 1 },
  ]),
  submitBoyForm
);

// New search route
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

export default router;
