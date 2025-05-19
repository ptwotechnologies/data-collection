// girlFormRoute.js
import multer from 'multer';
import express from 'express';
import { submitGirlForm } from '../controllers/girlFormController.js';
import GirlForm from '../models/girlFormModel.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

// Submission route
router.post(
  '/submit',
  upload.fields([
    { name: 'girlPhoto', maxCount: 1 },
    { name: 'boyPhoto', maxCount: 1 },
    { name: 'girlSignature', maxCount: 1 },
    { name: 'familySignature', maxCount: 1 },
  ]),
  submitGirlForm
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
    const girlData = await GirlForm.findOne({ mobileNumber });

    if (!girlData) {
      return res.status(404).json({
        success: false,
        message: 'No records found with this mobile number',
      });
    }

    return res.status(200).json({
      success: true,
      data: girlData,
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// New route: Get all girl form data
router.get('/all', async (req, res) => {
  try {
    const allGirlForms = await GirlForm.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({
      success: true,
      count: allGirlForms.length,
      data: allGirlForms,
    });
  } catch (error) {
    console.error('Fetch all error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve data',
    });
  }
});

export default router;
