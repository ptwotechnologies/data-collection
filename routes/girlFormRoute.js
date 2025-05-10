import multer from "multer";
import express from 'express';
const storage = multer.memoryStorage();
import { submitGirlForm } from '../controllers/girlFormController.js'
const upload = multer({ storage });
const router = express.Router();

router.post(
    "/submit",
    upload.fields([
        { name: "girlPhoto", maxCount: 1 },
        { name: "boyPhoto", maxCount: 1 },
        { name: "girlSignature", maxCount: 1 },
        { name: "familySignature", maxCount: 1 },
    ]),
    submitGirlForm
);


export default router