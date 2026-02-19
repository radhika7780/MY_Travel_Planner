import React from 'react';
import Navbar from '../components/Navbar';
import { FaBus, FaCalendarAlt, FaClock } from 'react-icons/fa';

const MyBookings = () => {
    // Mock bookings
    const bookings = [
        {
            id: 'TRV-892341',
            from: 'Hyderabad',
            to: 'Dwarka',
            date: '20 Feb 2026',
            time: '22:00',
            seats: 2,
            price: 3250,
            status: 'Upcoming',
            countdown: '2h 15m'
        },
        {
            id: 'TRV-123456',
            from: 'Mumbai',
            to: 'Goa',
            date: '15 Jan 2026',
            time: '21:30',
            seats: 1,
            price: 1200,
            status: 'Completed',
            countdown: null
        }
    ];

    return (
        <div className="bg-background min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">My Bookings</h1>

                <div className="space-y-6">
                    {bookings.map(booking => (
                        <div key={booking.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                            {/* Header */}
                            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                                <div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${booking.status === 'Upcoming' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                        {booking.status}
                                    </span>
                                    {booking.countdown && (
                                        <span className="ml-3 text-sm text-red-500 font-semibold animate-pulse">
                                            Trip starts in {booking.countdown}
                                        </span>
                                    )}
                                </div>
                                <span className="text-sm text-gray-500">#{booking.id}</span>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">{booking.from} <span className="text-gray-400 mx-2">→</span> {booking.to}</h3>
                                        <div className="flex items-center gap-4 text-gray-600 mt-2 text-sm">
                                            <span className="flex items-center gap-1"><FaCalendarAlt /> {booking.date}</span>
                                            <span className="flex items-center gap-1"><FaClock /> {booking.time}</span>
                                            <span className="flex items-center gap-1"><FaBus /> {booking.seats} Seats</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-800">₹{booking.price}</p>
                                        <button className="text-primary text-sm font-semibold hover:underline mt-1">
                                            View Ticket
                                        </button>
                                    </div>
                                </div>

                                {booking.status === 'Upcoming' && (
                                    <div className="flex gap-3 mt-4">
                                        <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition">Track Bus</button>
                                        <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50 transition">Cancel Booking</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyBookings;
