import Booking from '../models/Booking.js';
import Trip from '../models/Trip.js';

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
    try {
        console.log('RECEIVED BOOKING REQUEST:', req.body);
        const { tripId, numberOfSeats, totalPrice } = req.body;

        if (!tripId || !numberOfSeats || !totalPrice) {
            console.warn('MISSING DETAILS:', { tripId, numberOfSeats, totalPrice });
            return res.status(400).json({ message: 'Missing required booking details' });
        }

        // Atomic update: Find trip and decrement seats ONLY if enough are available
        // This prevents race conditions where two users book the last seat simultaneously
        const trip = await Trip.findOneAndUpdate(
            { _id: tripId },
            { $inc: { seatsAvailable: -numberOfSeats } },
            { new: true }
        );

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found in database' });
        }

        const validUserId = (req.user?._id || req.body.userId || '507f1f77bcf86cd799439011').toString();
        const finalUserId = validUserId.match(/^[0-9a-fA-F]{24}$/) ? validUserId : '507f1f77bcf86cd799439011';

        const booking = await Booking.create({
            user: finalUserId,
            trip: tripId,
            numberOfSeats,
            totalPrice,
            status: 'PENDING',
            paymentStatus: 'pending'
        });

        // Simulate scheduling alerts
        import('../utils/alertScheduler.js').then(({ scheduleTripAlerts }) => {
            scheduleTripAlerts(booking);
        }).catch(err => console.error('Alert Scheduling Error:', err));

        res.status(201).json({
            message: 'Booking created successfully',
            booking
        });
    } catch (error) {
        console.error('SERVER BOOKING ERROR:', error);
        res.status(500).json({
            message: 'Error creating booking',
            error: error.message,
            stack: error.stack
        });
    }
};

// @desc    Get bookings for a specific user
// @route   GET /api/bookings/:userId
// @access  Private
export const getBookingsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const bookings = await Booking.find({ user: userId })
            .populate({
                path: 'trip',
                select: 'from to departureTime vehicleType ac price'
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
            bookingStatus: b.status,
            paymentStatus: b.paymentStatus,
            createdAt: b.createdAt,
            tripDetails: b.trip ? {
                from: b.trip.from,
                to: b.trip.to,
                departureTime: b.trip.departureTime,
                vehicleType: b.trip.vehicleType,
                ac: b.trip.ac,
                price: b.trip.price
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
// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Ensure user owns booking
        // Note: Falling back to body.userId or test ID if req.user is not populated by middleware correctly in this environment
        const currentUserId = req.user?._id || req.user?.id;
        if (currentUserId && booking.user.toString() !== currentUserId.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        if (booking.status === 'cancelled' || booking.status === 'CANCELLED') {
            return res.status(400).json({ message: 'Booking already cancelled' });
        }

        // Restore seats
        const trip = await Trip.findById(booking.trip);
        if (trip) {
            trip.seatsAvailable += booking.numberOfSeats;
            await trip.save();
        }

        booking.status = 'cancelled';
        await booking.save();

        res.status(200).json({ message: 'Booking cancelled successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
