import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUserFriends, FaSearch, FaExchangeAlt } from 'react-icons/fa';

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
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col lg:flex-row gap-4 items-center relative z-20"
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full items-center">

                {/* From Field */}
                <div className="md:col-span-3 w-full">
                    <label className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1 ml-1">From</label>
                    <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 hover:bg-white hover:border-blue-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all cursor-text group">
                        <FaMapMarkerAlt className="text-gray-400 group-focus-within:text-primary transition text-lg" />
                        <div className="ml-3 flex-1">
                            <input
                                type="text"
                                placeholder="Enter Source"
                                className="w-full bg-transparent focus:outline-none text-gray-800 font-semibold placeholder-gray-400"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Swap Icon (Visual only for now) */}
                <div className="hidden md:flex justify-center -mx-2 z-10">
                    <button type="button" className="bg-white border border-gray-200 p-2 rounded-full shadow-sm hover:shadow-md hover:text-primary transition transform hover:rotate-180">
                        <FaExchangeAlt />
                    </button>
                </div>

                {/* To Field */}
                <div className="md:col-span-3 w-full">
                    <label className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1 ml-1">To</label>
                    <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 hover:bg-white hover:border-blue-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all cursor-text group">
                        <FaMapMarkerAlt className="text-gray-400 group-focus-within:text-primary transition text-lg" />
                        <div className="ml-3 flex-1">
                            <input
                                type="text"
                                placeholder="Enter Destination"
                                className="w-full bg-transparent focus:outline-none text-gray-800 font-semibold placeholder-gray-400"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Date Field */}
                <div className="md:col-span-3 w-full">
                    <label className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1 ml-1">Date</label>
                    <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 hover:bg-white hover:border-blue-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all cursor-pointer group">
                        <FaCalendarAlt className="text-gray-400 group-focus-within:text-primary transition text-lg" />
                        <div className="ml-3 flex-1">
                            <input
                                type="date"
                                className="w-full bg-transparent focus:outline-none text-gray-800 font-semibold cursor-pointer"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Travelers Field */}
                <div className="md:col-span-2 w-full">
                    <label className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1 ml-1">Travelers</label>
                    <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 hover:bg-white hover:border-blue-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all cursor-pointer group">
                        <FaUserFriends className="text-gray-400 group-focus-within:text-primary transition text-lg" />
                        <div className="ml-3 flex-1">
                            <input
                                type="number"
                                min="1"
                                className="w-full bg-transparent focus:outline-none text-gray-800 font-semibold"
                                value={travelers}
                                onChange={(e) => setTravelers(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* Search Button (Full width on mobile, auto on desktop) */}
            <div className="w-full lg:w-auto mt-4 lg:mt-0 lg:ml-2">
                <button
                    type="submit"
                    className="w-full bg-danger text-white font-bold text-lg py-4 px-10 rounded-xl hover:bg-red-600 transition shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                    <FaSearch />
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchForm;
