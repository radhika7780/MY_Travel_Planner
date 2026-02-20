import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    from: {
        type: String,
        required: [true, 'Please add departure location'],
        trim: true
    },
    to: {
        type: String,
        required: [true, 'Please add destination location'],
        trim: true
    },
    departureTime: {
        type: String,
        required: [true, 'Please add departure time']
    },
    departureDateTime: {
        type: Date,
        required: [true, 'Please add departure date and time for scheduling']
    },
    arrivalTime: {
        type: String,
        required: [true, 'Please add arrival time']
    },
    duration: {
        type: String,
        required: [true, 'Please add duration']
    },
    vehicleType: {
        type: String,
        required: [true, 'Please add vehicle type']
    },
    price: {
        type: Number,
        required: [true, 'Please add price']
    },
    seatsAvailable: {
        type: Number,
        required: [true, 'Please add available seats']
    },
    totalSeats: {
        type: Number,
        required: [true, 'Please add total seats']
    },
    ac: {
        type: Boolean,
        default: true
    },
    foodIncluded: {
        type: Boolean,
        default: false
    },
    specialFacilities: {
        type: [String],
        default: []
    },
    discountPercentage: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Indexing for faster searches
tripSchema.index({ from: 1, to: 1 });

export default mongoose.model('Trip', tripSchema);
