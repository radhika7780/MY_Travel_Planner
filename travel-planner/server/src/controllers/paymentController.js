import Booking from '../models/Booking.js';
import Trip from '../models/Trip.js';

// @desc    Initiate a payment session
// @route   POST /api/payment/initiate
// @access  Private
export const initiatePayment = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Generate a mock transaction ID
        const transactionId = `TXN_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        res.status(200).json({
            message: 'Payment initiated',
            transactionId,
            amount: booking.totalPrice,
            currency: 'INR'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error initiating payment', error: error.message });
    }
};

// @desc    Verify a payment session
// @route   POST /api/payment/verify
// @access  Private
export const verifyPayment = async (req, res) => {
    try {
        const { bookingId, transactionId } = req.body;

        const booking = await Booking.findById(bookingId).populate('trip');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Prevent duplicate confirmation
        if (booking.status === 'CONFIRMED') {
            return res.status(400).json({ message: 'Booking is already confirmed' });
        }

        // Simulate verification logic (80% success rate for simulation)
        const isSuccess = Math.random() > 0.2;

        if (isSuccess) {
            booking.status = 'CONFIRMED';
            booking.paymentStatus = 'paid';
            await booking.save();

            return res.status(200).json({
                message: 'Payment verified and booking confirmed',
                booking
            });
        } else {
            // Failure logic: Release seats back to trip
            if (booking.trip) {
                await Trip.findByIdAndUpdate(booking.trip._id, {
                    $inc: { seatsAvailable: booking.numberOfSeats }
                });
            }

            booking.status = 'CANCELLED';
            booking.paymentStatus = 'failed';
            await booking.save();

            return res.status(400).json({
                message: 'Payment verification failed. Booking cancelled and seats released.',
                booking
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error verifying payment', error: error.message });
    }
};
