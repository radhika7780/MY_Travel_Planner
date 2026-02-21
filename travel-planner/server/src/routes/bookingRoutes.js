import express from 'express';
import { createBooking, getBookingsByUserId, cancelBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
import { createBookingValidation, validate } from '../middleware/validator.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/:userId', getBookingsByUserId);
router.put('/:id/cancel', protect, cancelBooking);

export default router;
