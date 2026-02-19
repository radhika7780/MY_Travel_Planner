import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BookingForm from '../components/BookingForm';
import { FaBus, FaWifi, FaPlug, FaUtensils, FaClock, FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const TripDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock trip data
    const trip = {
        id: id,
        name: 'Hyderabad → Dwarka',
        vehicleType: 'Scania Multi-Axle AC Sleeper',
        rating: 4.8,
        reviews: 124,
        price: 1500,
        offerPrice: 200, // Discount amount
        duration: '14h 30m',
        departure: '22:00',
        arrival: '12:30',
        amenities: [
            { icon: <FaWifi />, name: 'Free WiFi' },
            { icon: <FaPlug />, name: 'Charging Point' },
            { icon: <FaUtensils />, name: 'Dinner Included' },
            { icon: <FaBus />, name: 'Reading Light' }
        ]
    };

    const handleBook = (bookingData) => {
        console.log('Booking:', bookingData);
        // Pass booking data to payment page
        navigate('/payment', { state: { trip, bookingData } });
    };

    return (
        <div className="bg-background min-h-screen pb-12">
            <Navbar />

            {/* Header / Breadcrumb */}
            <div className="bg-primary text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold">{trip.name}</h1>
                    <div className="flex items-center gap-4 mt-2 text-blue-100">
                        <span className="bg-green-500 text-white px-2 py-0.5 rounded text-sm font-bold flex items-center gap-1">
                            {trip.rating} <FaStar />
                        </span>
                        <span>{trip.reviews} Ratings</span>
                        <span>•</span>
                        <span>{trip.vehicleType}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Trip Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Timing Card */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-800">{trip.departure}</p>
                                <p className="text-gray-500">Hyderabad</p>
                            </div>
                            <div className="flex-1 px-8 flex flex-col items-center">
                                <span className="text-gray-400 text-sm mb-1">{trip.duration}</span>
                                <div className="w-full h-0.5 bg-gray-300 relative">
                                    <div className="absolute left-0 -top-1.5 w-3 h-3 border-2 border-gray-400 bg-white rounded-full"></div>
                                    <div className="absolute right-0 -top-1.5 w-3 h-3 border-2 border-gray-400 bg-white rounded-full"></div>
                                </div>
                                <span className="text-xs text-green-600 mt-1 font-semibold">On Time</span>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-800">{trip.arrival}</p>
                                <p className="text-gray-500">Dwarka</p>
                            </div>
                        </div>

                        {/* Stops Visualization (Simple) */}
                        <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
                            <FaMapMarkerAlt className="text-primary mt-1" />
                            <div>
                                <p className="font-semibold text-gray-700">Boarding Point: MGBS Bus Station</p>
                                <p className="text-sm text-gray-500">Platform No. 12, Near Ticket Counter</p>
                            </div>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Amenities</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {trip.amenities.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    <span className="text-primary text-lg">{item.icon}</span>
                                    <span className="text-sm font-medium">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vehicle Images (Placeholder) */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Vehicle Photos</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="aspect-video bg-gray-200 rounded-lg"></div>
                            <div className="aspect-video bg-gray-200 rounded-lg"></div>
                            <div className="aspect-video bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Booking Form */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <BookingForm trip={trip} onBook={handleBook} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripDetails;
