import React from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaWifi, FaBolt, FaUtensils, FaStar, FaRupeeSign } from 'react-icons/fa';

const TripCard = ({ trip }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col">
            <div className="p-6 flex-1">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition line-clamp-1">{trip.name}</h3>
                        <div className="flex items-center text-gray-500 text-sm mt-1 gap-2">
                            <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-semibold">{trip.vehicleType || 'AC Sleeper'}</span>
                            <span className="flex items-center gap-1 text-orange-500 font-bold text-xs"><FaStar /> {trip.rating || 4.5}</span>
                        </div>
                    </div>
                    {trip.seatsAvailable < 10 && (
                        <span className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                            Only {trip.seatsAvailable} Left!
                        </span>
                    )}
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-between text-gray-700 mb-6">
                    <div className="text-center">
                        <p className="text-xl font-bold">22:00</p>
                        <p className="text-xs text-gray-400 font-medium">Departure</p>
                    </div>
                    <div className="flex-1 px-4 flex flex-col items-center">
                        <div className="text-xs text-gray-400 mb-1 font-medium">{trip.duration || '12h 30m'}</div>
                        <div className="w-full h-[2px] bg-gray-200 relative">
                            <div className="absolute left-0 -top-1 w-2.5 h-2.5 bg-gray-300 rounded-full group-hover:bg-primary transition-colors"></div>
                            <div className="absolute right-0 -top-1 w-2.5 h-2.5 bg-gray-300 rounded-full group-hover:bg-primary transition-colors"></div>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-bold">10:30</p>
                        <p className="text-xs text-gray-400 font-medium">Arrival</p>
                    </div>
                </div>

                {/* Amenities */}
                <div className="flex gap-4 text-gray-400 mb-6 justify-center">
                    <div className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 hover:text-primary transition" title="WiFi"><FaWifi /></div>
                    <div className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 hover:text-primary transition" title="Charging Point"><FaBolt /></div>
                    <div className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 hover:text-primary transition" title="Dinner"><FaUtensils /></div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-100 group-hover:bg-blue-50 transition-colors duration-300">
                <div>
                    <span className="text-xs text-gray-400 line-through block">₹{trip.price + 500}</span>
                    <span className="text-2xl font-bold text-gray-900 flex items-center">
                        <FaRupeeSign className="text-sm" />{trip.price}
                    </span>
                </div>
                <Link
                    to={`/trip/${trip.id}`}
                    className="bg-primary text-white font-bold py-2.5 px-6 rounded-lg hover:bg-blue-700 transition shadow-md transform hover:-translate-y-0.5"
                >
                    View Seats
                </Link>
            </div>
        </div>
    );
};

export default TripCard;
