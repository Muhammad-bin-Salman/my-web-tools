import express from 'express';
import { calculateEMI, calculateBMI, calculateAge, calculateProfitMargin } from '../controllers/calculatorController.js';
const router = express.Router();


router.post('/emi', calculateEMI);
router.post('/bmi', calculateBMI);
router.post('/age', calculateAge);
router.post('/profitMargin', calculateProfitMargin);


export default router;