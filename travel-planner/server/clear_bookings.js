import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Booking from './src/models/Booking.js';

dotenv.config();

async function clear() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const result = await Booking.deleteMany({});
        console.log(`Cleared ${result.deletedCount} stale bookings.`);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

clear();
