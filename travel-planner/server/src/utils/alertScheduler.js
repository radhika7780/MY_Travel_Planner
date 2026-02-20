import { sendSMS, sendEmail } from './sendNotification.js';

export const scheduleTripAlerts = (booking) => {
    console.log(`[Scheduler] Scheduling alerts for Booking ID: ${booking.id}`);

    // Simulate scheduling a "Booking Confirmation" immediately
    sendEmail(
        `user_${booking.userId}@example.com`,
        "Booking Confirmation",
        `Your trip to TripID ${booking.tripId} is confirmed. Seats: ${booking.numberOfSeats}`
    );

    // Simulate scheduling a "Reminder" (just a log for now, as if it would happen later)
    console.log(`[Scheduler] Scheduled reminder for Trip ${booking.tripId} (Simulated 24h before departure via SMS)`);

    // In a real app, we might store this in a job queue (BullMQ/Agenda)
    // For demo purposes, we'll just log it.
};

export const triggerManualAlert = (type, recipient, message) => {
    // Utility for manual testing if needed
    if (type === 'SMS') {
        sendSMS(recipient, message);
    } else if (type === 'EMAIL') {
        sendEmail(recipient, "Travel Alert", message);
    }
};
