import express from 'express';
import { base64Encode, base64Decode } from '../controllers/seoToolController.js';
const router = express.Router();


router.post('/base64-encode', base64Encode);
router.post('/base64-decode', base64Decode);


export default router;