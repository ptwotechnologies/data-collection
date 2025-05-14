import multer from "multer";
import express from 'express';
import { submitBoyForm } from '../controllers/boyFormController.js'
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post(
    "/submit",
    upload.fields([
        { name: "boyPhoto", maxCount: 1 },
        { name: "girlPhoto", maxCount: 1 },
        { name: "boySignature", maxCount: 1 },
        { name: "familySignature", maxCount: 1 },
    ]),
    submitBoyForm
);


export default router