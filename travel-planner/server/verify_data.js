import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Booking from './src/models/Booking.js';
import Trip from './src/models/Trip.js';

dotenv.config();

async function verify() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const bookings = await Booking.find({ user: '507f1f77bcf86cd799439011' });
        console.log(`Found ${bookings.length} bookings for test user.`);

        for (const b of bookings) {
            const trip = await Trip.findById(b.trip);
            console.log(`Booking ${b._id} -> Trip ID ${b.trip} -> Exists? ${!!trip}`);
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

verify();
