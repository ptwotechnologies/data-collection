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
router.get('/',  getRegistrations);  
router.put('/:id', updateRegistration);  
router.delete('/:id', deleteRegistration);  
router.get('/export/csv', exportCSV);  
router.post('/import/csv', upload.single('file'), importCSV); 

export default router;
