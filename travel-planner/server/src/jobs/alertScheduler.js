import cron from 'node-cron';
import Booking from '../models/Booking.js';
import Trip from '../models/Trip.js';

/**
 * Initializes the Trip Reminder Alert System.
 * Runs every minute to check for upcoming trips and log reminders.
 */
export const initAlertScheduler = () => {
    console.log('Trip Reminder Alert System Initialized (Running every minute)');

    cron.schedule('* * * * *', async () => {
        try {
            const now = new Date();

            // Find CONFIRMED bookings that still have reminders to send
            const pendingBookings = await Booking.find({
                status: 'CONFIRMED',
                $or: [
                    { reminder2hrSent: false },
                    { reminder30minSent: false }
                ]
            }).populate('trip');

            for (const booking of pendingBookings) {
                if (!booking.trip || !booking.trip.departureDateTime) continue;

                const departure = new Date(booking.trip.departureDateTime);
                const diffInMs = departure - now;
                const diffInMins = diffInMs / (1000 * 60);

                // TEST MODE: 2-hour reminder triggered (now at 5 mins)
                if (!booking.reminder2hrSent && diffInMins <= 5 && diffInMins > 2) {
                    console.log(`[ALERT] TEST MODE: 2-hour reminder triggered for user ${booking.user} (trip: ${booking.trip._id})`);
                    booking.reminder2hrSent = true;
                    await booking.save();
                }

                // TEST MODE: 30-minute reminder triggered (now at 2 mins)
                if (!booking.reminder30minSent && diffInMins <= 2 && diffInMins > 0) {
                    console.log(`[ALERT] TEST MODE: 30-minute reminder triggered for user ${booking.user} (trip: ${booking.trip._id})`);
                    booking.reminder30minSent = true;
                    await booking.save();
                }
            }
        } catch (error) {
            console.error('Error in Trip Reminder Cron Job:', error.message);
        }
    });
};
