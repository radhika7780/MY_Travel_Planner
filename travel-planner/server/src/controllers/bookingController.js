import Booking from '../models/Booking.js';
import Trip from '../models/Trip.js';

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
    try {
        const { tripId, numberOfSeats, totalPrice } = req.body;

        if (!tripId || !numberOfSeats || !totalPrice) {
            return res.status(400).json({ message: 'Missing required booking details' });
        }

        // Atomic update: Find trip and decrement seats ONLY if enough are available
        // This prevents race conditions where two users book the last seat simultaneously
        const trip = await Trip.findOneAndUpdate(
            {
                _id: tripId,
                seatsAvailable: { $gte: numberOfSeats }
            },
            {
                $inc: { seatsAvailable: -numberOfSeats }
            },
            { new: true } // Return the updated document
        );

        if (!trip) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        const booking = await Booking.create({
            user: req.user._id,
            trip: tripId,
            numberOfSeats,
            totalPrice,
            status: 'PENDING',
            paymentStatus: 'pending'
        });

        // Simulate scheduling alerts
        import('../utils/alertScheduler.js').then(({ scheduleTripAlerts }) => {
            scheduleTripAlerts(booking);
        });

        res.status(201).json({
            message: 'Booking created successfully',
            booking
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

// @desc    Get bookings for a specific user
// @route   GET /api/bookings/:userId
// @access  Private
export const getBookingsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Ensure user is fetching their own bookings or is an admin
        if (req.user._id.toString() !== userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to access these bookings' });
        }

        const bookings = await Booking.find({ user: userId })
            .populate({
                path: 'trip',
                select: 'from to departureTime vehicleType'
            })
            .sort('-createdAt');

        // Format response to match frontend expectations (keeping tripDetails wrapper)
        const formattedBookings = bookings.map(b => ({
            _id: b._id,
            tripId: b.trip?._id,
            userId: b.user,
            numberOfSeats: b.numberOfSeats,
            totalPrice: b.totalPrice,
            status: b.status,
            paymentStatus: b.paymentStatus,
            createdAt: b.createdAt,
            tripDetails: b.trip ? {
                from: b.trip.from,
                to: b.trip.to,
                departureTime: b.trip.departureTime,
                vehicleType: b.trip.vehicleType
            } : null
        }));

        res.status(200).json(formattedBookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user bookings', error: error.message });
    }
};

// @desc    Get all bookings (admin use)
// @route   GET /api/bookings
// @access  Private/Admin
export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user', 'name email').populate('trip');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
};
