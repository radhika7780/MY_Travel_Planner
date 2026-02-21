import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    numberOfSeats: {
        type: Number,
        required: [true, 'Please add number of seats'],
        min: [1, 'Must book at least one seat']
    },
    totalPrice: {
        type: Number,
        required: [true, 'Please add total price']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'PENDING', 'CONFIRMED', 'CANCELLED'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    reminder2hrSent: {
        type: Boolean,
        default: false
    },
    reminder30minSent: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Booking', bookingSchema);
