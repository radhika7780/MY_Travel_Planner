import express from 'express';
import { createBooking, getBookingsByUserId } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/:userId', protect, getBookingsByUserId);

export default router;
