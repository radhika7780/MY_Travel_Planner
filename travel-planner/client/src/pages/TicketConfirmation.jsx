import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaCheckCircle, FaDownload, FaQrcode } from 'react-icons/fa';

const TicketConfirmation = () => {
    const location = useLocation();
    const { trip, bookingData } = location.state || { trip: {}, bookingData: {} };

    // Fallback ID
    const bookingId = "TRV-" + Math.floor(100000 + Math.random() * 900000);

    return (
        <div className="bg-background min-h-screen flex flex-col">
            <Navbar />
            <div className="container mx-auto px-4 py-12 flex justify-center flex-1">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl w-full h-fit">
                    <div className="bg-green-500 text-white p-8 text-center">
                        <FaCheckCircle className="text-6xl mx-auto mb-4" />
                        <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
                        <p className="opacity-90 mt-2">Your ticket has been sent to {bookingData.passenger?.email}</p>
                    </div>

                    <div className="p-8">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <p className="text-sm text-gray-500">Booking ID</p>
                                <p className="text-xl font-bold text-gray-800">{bookingId}</p>
                            </div>
                            <div className="text-right">
                                <FaQrcode className="text-6xl ml-auto text-gray-800" />
                            </div>
                        </div>

                        <div className="border-t border-b py-6 mb-6 grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-500">Trip</p>
                                <p className="font-bold text-gray-800">{trip.from} → {trip.to}</p>
                                <p className="text-xs text-gray-500">{trip.vehicleType}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Departure</p>
                                <p className="font-bold text-gray-800">{trip.departureTime || '22:00'}</p>
                                <p className="text-xs text-gray-500">{trip.from}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Passenger</p>
                                <p className="font-bold text-gray-800">{bookingData.passenger?.name}</p>
                                <p className="text-xs text-gray-500">{bookingData.passenger?.phone}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Seats</p>
                                <p className="font-bold text-gray-800">{bookingData.seats}</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 bg-gray-100 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2">
                                <FaDownload /> Download PDF
                            </button>
                            <Link to="/my-bookings" className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center text-center">
                                View My Bookings
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TicketConfirmation;
