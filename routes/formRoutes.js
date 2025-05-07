import express from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/authMiddleware.js'
import {
    createRegistration, getRegistrations, updateRegistration,
    deleteRegistration,
    exportCSV,
    importCSV,
} from '../controllers/formController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.post('/', createRegistration);  
router.get('/', authMiddleware ,getRegistrations);  
router.put('/:id', authMiddleware, updateRegistration);  
router.delete('/:id',authMiddleware, deleteRegistration);  
router.get('/export/csv', authMiddleware, exportCSV);  
router.post('/import/csv', upload.single('file'), importCSV); 

export default router;
