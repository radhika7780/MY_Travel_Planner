import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BookingForm from '../components/BookingForm';
import { FaBus, FaWifi, FaPlug, FaUtensils, FaClock, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { fetchTripById, createBooking } from '../services/api';

const TripDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isBooking, setIsBooking] = useState(false);

    useEffect(() => {
        const loadTrip = async () => {
            setLoading(true);
            try {
                const data = await fetchTripById(id);
                setTrip(data);
            } catch (err) {
                console.error('Error fetching trip details:', err);
                setError(err.message || 'Failed to fetch trip details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadTrip();
        }
    }, [id]);

    const handleBook = async (bookingData) => {
        setIsBooking(true);
        try {
            // Mock userId for now
            const userId = 'user_123';

            const bookingPayload = {
                userId,
                tripId: trip._id,
                numberOfSeats: bookingData.seats,
                totalPrice: bookingData.amount
            };

            const newBooking = await createBooking(bookingPayload);

            navigate('/payment', { state: { trip, booking: newBooking, msg: 'Booking Initiated' } });
        } catch (err) {
            console.error(err);
            alert('Failed to initiate booking. Please try again.');
        } finally {
            setIsBooking(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-background min-h-screen pb-12">
                <Navbar />
                <div className="container mx-auto px-4 py-20 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading trip details...</p>
                </div>
            </div>
        );
    }

    if (error || !trip) {
        return (
            <div className="bg-background min-h-screen pb-12">
                <Navbar />
                <div className="container mx-auto px-4 py-20 text-center">
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
                        {error || 'Trip not found'}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pb-12">
            <Navbar />

            {/* Header / Breadcrumb */}
            <div className="bg-primary text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold">{trip.from} → {trip.to}</h1>
                    <div className="flex items-center gap-4 mt-2 text-blue-100">
                        <span className="bg-green-500 text-white px-2 py-0.5 rounded text-sm font-bold flex items-center gap-1">
                            {trip.rating || '4.5'} <FaStar />
                        </span>
                        <span>{trip.reviews || '100+'} Ratings</span>
                        <span>•</span>
                        <span>{trip.vehicleType}</span>
                        <span>•</span>
                        <span className={`${trip.seatsAvailable < 10 ? 'text-red-300 font-bold' : ''}`}>
                            {trip.seatsAvailable} Seats Left
                        </span>
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
                                <p className="text-2xl font-bold text-gray-800">{trip.departureTime}</p>
                                <p className="text-gray-500">{trip.from}</p>
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
                                <p className="text-2xl font-bold text-gray-800">{trip.arrivalTime}</p>
                                <p className="text-gray-500">{trip.to}</p>
                            </div>
                        </div>

                        {/* Stops Visualization (Simple) */}
                        <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
                            <FaMapMarkerAlt className="text-primary mt-1" />
                            <div>
                                <p className="font-semibold text-gray-700">Boarding Point: Main Station</p>
                                <p className="text-sm text-gray-500">Platform No. 5</p>
                            </div>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Amenities</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* Static amenities for now, or map from trip.specialFacilities if available */}
                            {trip.specialFacilities && trip.specialFacilities.length > 0 ? (
                                trip.specialFacilities.map((facility, index) => (
                                    <div key={index} className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                                        <span className="text-primary text-lg"><FaStar /></span>
                                        <span className="text-sm font-medium">{facility}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No specific amenities listed.</p>
                            )}
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
                        <BookingForm trip={trip} onBook={handleBook} loading={isBooking} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripDetails;
