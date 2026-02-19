import React from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaWifi, FaBolt, FaUtensils, FaClock } from 'react-icons/fa';

const TripCard = ({ trip }) => {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 overflow-hidden group">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition">{trip.name}</h3>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                            <FaBus className="mr-2" />
                            <span>{trip.vehicleType || 'Volvo AC Sleeper'}</span>
                        </div>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                        {trip.seatsAvailable || 12} Seats Left
                    </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-gray-600">
                    <div className="text-center">
                        <p className="text-lg font-bold text-gray-800">22:00</p>
                        <p className="text-xs">Hyderabad</p>
                    </div>
                    <div className="flex-1 px-4 flex flex-col items-center">
                        <div className="text-xs text-gray-400 mb-1">{trip.duration || '12h 30m'}</div>
                        <div className="w-full h-0.5 bg-gray-300 relative">
                            <div className="absolute left-0 -top-1 w-2 h-2 bg-gray-400 rounded-full"></div>
                            <div className="absolute right-0 -top-1 w-2 h-2 bg-gray-400 rounded-full"></div>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold text-gray-800">10:30</p>
                        <p className="text-xs">Goa</p>
                    </div>
                </div>

                <div className="mt-4 flex gap-3 text-gray-400">
                    <FaWifi title="WiFi" />
                    <FaBolt title="Charging Point" />
                    <FaUtensils title="Dinner" />
                </div>

                <div className="mt-6 flex justify-between items-center border-t pt-4">
                    <div>
                        <span className="text-xs text-gray-500 line-through mr-2">₹{trip.price + 200}</span>
                        <span className="text-2xl font-bold text-gray-800">₹{trip.price}</span>
                    </div>
                    <Link
                        to={`/trip/${trip.id}`}
                        className="bg-secondary text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600 transition shadow-sm"
                    >
                        View Seats
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TripCard;
