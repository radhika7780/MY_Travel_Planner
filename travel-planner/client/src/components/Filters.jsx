import React, { useState } from 'react';
import { FaFilter, FaBus, FaWifi, FaWheelchair, FaChild } from 'react-icons/fa';

const Filters = ({ onFilter }) => {
    const [priceRange, setPriceRange] = useState(2000);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-24">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <FaFilter className="text-primary" /> Filters
                </h3>
                <button className="text-sm text-red-500 font-semibold hover:underline">Reset</button>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Budget Range (₹0 - ₹{priceRange})
                </label>
                <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
            </div>

            {/* Vehicle Type */}
            <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-700 mb-3">Vehicle Type</h4>
                <div className="space-y-2">
                    {['Sleeper AC', 'Seater AC', 'Non-AC', 'Volvo Multi-Axle'].map((type) => (
                        <label key={type} className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary" />
                            <span className="text-gray-600 text-sm">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Departure Time */}
            <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-700 mb-3">Departure Time</h4>
                <div className="grid grid-cols-2 gap-2">
                    {['Morning', 'Afternoon', 'Evening', 'Night'].map((time) => (
                        <button key={time} className="text-xs border rounded-lg py-2 px-1 hover:bg-gray-50 focus:bg-blue-50 focus:border-blue-500 focus:text-primary transition text-gray-600">
                            {time}
                        </button>
                    ))}
                </div>
            </div>

            {/* Amenities */}
            <div>
                <h4 className="text-sm font-bold text-gray-700 mb-3">Amenities</h4>
                <div className="space-y-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="form-checkbox text-primary rounded" />
                        <span className="text-gray-600 text-sm flex items-center gap-2"><FaWifi /> WiFi</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="form-checkbox text-primary rounded" />
                        <span className="text-gray-600 text-sm flex items-center gap-2"><FaBus /> AC</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="form-checkbox text-primary rounded" />
                        <span className="text-gray-600 text-sm flex items-center gap-2"><FaWheelchair /> Disabled Friendly</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="form-checkbox text-primary rounded" />
                        <span className="text-gray-600 text-sm flex items-center gap-2"><FaChild /> Child &lt; 2 Allowed</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Filters;
