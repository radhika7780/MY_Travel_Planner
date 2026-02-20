import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaBus, FaCalendarAlt, FaClock, FaTicketAlt } from 'react-icons/fa';
import { fetchUserBookings } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const loadBookings = async () => {
            if (!user) return;
            try {
                setLoading(true);
                const data = await fetchUserBookings(user.id);
                setBookings(data);
            } catch (err) {
                setError('Failed to load your bookings. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadBookings();
    }, [user]);

    if (loading) {
        return (
            <div className="bg-background min-h-screen">
                <Navbar />
                <div className="container mx-auto px-4 py-20 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading your bookings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pb-20">
            <Navbar />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                        <FaTicketAlt className="text-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100 font-medium">
                        {error}
                    </div>
                )}

                {bookings.length === 0 && !error ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaBus className="text-3xl text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No bookings found</h3>
                        <p className="text-gray-500 mb-8">You haven't made any bookings yet. Start planning your next trip!</p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-primary/20"
                        >
                            Find a Trip
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={booking._id}
                                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {/* Header */}
                                <div className="bg-gray-50 px-8 py-4 border-b flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${booking.bookingStatus === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                            {booking.bookingStatus}
                                        </span>
                                        <span className="text-xs font-medium text-gray-400">BOOKING ID: #{booking._id}</span>
                                    </div>
                                    <span className="text-xs font-medium text-gray-400">
                                        {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="p-8">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                                {booking.tripDetails?.from || 'Origin'}
                                                <span className="text-primary/30">→</span>
                                                {booking.tripDetails?.to || 'Destination'}
                                            </h3>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                                <div className="space-y-1">
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Departure</p>
                                                    <p className="font-bold text-gray-800 flex items-center gap-2">
                                                        <FaClock className="text-primary" /> {booking.tripDetails?.departureTime || '--:--'}
                                                    </p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Passengers</p>
                                                    <p className="font-bold text-gray-800 flex items-center gap-2">
                                                        <FaBus className="text-primary" /> {booking.numberOfSeats} {booking.numberOfSeats > 1 ? 'Seats' : 'Seat'}
                                                    </p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Vehicle</p>
                                                    <p className="font-bold text-gray-800 truncate">{booking.tripDetails?.vehicleType || 'Bus'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-auto text-left md:text-right pt-6 md:pt-0 border-t md:border-t-0 border-gray-100">
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Total Amount</p>
                                            <p className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">₹{booking.totalPrice}</p>
                                            <div className="flex md:flex-col gap-2">
                                                <button className="flex-1 bg-primary text-white text-sm font-bold py-2.5 px-6 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-primary/20">
                                                    View Ticket
                                                </button>
                                                <button className="flex-1 border border-red-100 text-red-500 text-sm font-bold py-2.5 px-6 rounded-xl hover:bg-red-50 transition">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
