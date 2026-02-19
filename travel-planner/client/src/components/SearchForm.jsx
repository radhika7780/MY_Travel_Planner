import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUserFriends, FaSearch } from 'react-icons/fa';

const SearchForm = ({ onSearch }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [travelers, setTravelers] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ from, to, date, travelers });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-xl flex flex-col md:flex-row gap-4 items-end -mt-10 relative z-10 mx-4 md:mx-0">
            {/* From */}
            <div className="flex-1 w-full">
                <label className="block text-gray-600 text-sm font-semibold mb-1">From</label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-primary focus-within:bg-white transition">
                    <FaMapMarkerAlt className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="City or Station"
                        className="w-full bg-transparent focus:outline-none text-gray-800"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* To */}
            <div className="flex-1 w-full">
                <label className="block text-gray-600 text-sm font-semibold mb-1">To</label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-primary focus-within:bg-white transition">
                    <FaMapMarkerAlt className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="City or Station"
                        className="w-full bg-transparent focus:outline-none text-gray-800"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Date */}
            <div className="flex-1 w-full md:w-auto">
                <label className="block text-gray-600 text-sm font-semibold mb-1">Date</label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-primary focus-within:bg-white transition">
                    <FaCalendarAlt className="text-gray-400 mr-2" />
                    <input
                        type="date"
                        className="w-full bg-transparent focus:outline-none text-gray-800"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Travelers */}
            <div className="w-full md:w-32">
                <label className="block text-gray-600 text-sm font-semibold mb-1">Travelers</label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-primary focus-within:bg-white transition">
                    <FaUserFriends className="text-gray-400 mr-2" />
                    <input
                        type="number"
                        min="1"
                        className="w-full bg-transparent focus:outline-none text-gray-800"
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                    />
                </div>
            </div>

            {/* Search Button */}
            <button
                type="submit"
                className="w-full md:w-auto bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition shadow-lg transform active:scale-95 flex items-center justify-center gap-2"
            >
                <FaSearch />
                Search
            </button>
        </form>
    );
};

export default SearchForm;
