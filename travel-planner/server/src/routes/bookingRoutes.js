import express from 'express';
import { createBooking, getBookingsByUserId } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
import { createBookingValidation, validate } from '../middleware/validator.js';

const router = express.Router();

router.post('/', protect, createBookingValidation, validate, createBooking);
router.get('/:userId', protect, getBookingsByUserId);

export default router;
