import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminController.js'

const router = express.Router();

// Admin Registration Route
router.post('/register', registerAdmin);

// Admin Login Route
router.post('/login', loginAdmin);

export default router;
