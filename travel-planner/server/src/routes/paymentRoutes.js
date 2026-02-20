import express from 'express';
import { initiatePayment, verifyPayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { initiatePaymentValidation, verifyPaymentValidation, validate } from '../middleware/validator.js';

const router = express.Router();

router.post('/initiate', protect, initiatePaymentValidation, validate, initiatePayment);
router.post('/verify', protect, verifyPaymentValidation, validate, verifyPayment);

export default router;
