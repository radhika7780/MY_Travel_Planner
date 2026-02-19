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
            className="bg-white shadow-2xl rounded-2xl p-8 -mt-10 flex flex-col lg:flex-row gap-6 items-center relative z-20"
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full items-center">

                {/* From Field */}
                <div className="md:col-span-3 w-full border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-4">
                    <label className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 ml-1">From</label>
                    <div className="flex items-center px-2 py-2 bg-white transition-all cursor-text group">
                        <FaMapMarkerAlt className="text-gray-400 group-focus-within:text-primary transition text-xl" />
                        <div className="ml-4 flex-1">
                            <input
                                type="text"
                                placeholder="Enter Source"
                                className="w-full bg-transparent focus:outline-none text-gray-800 font-bold text-lg placeholder-gray-300"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Swap Icon */}
                <div className="hidden md:flex justify-center -mx-4 z-10">
                    <button type="button" className="bg-blue-50 text-blue-500 p-2 rounded-full hover:bg-blue-100 transition transform hover:rotate-180">
                        <FaExchangeAlt />
                    </button>
                </div>

                {/* To Field */}
                <div className="md:col-span-3 w-full border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-4">
                    <label className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 ml-1">To</label>
                    <div className="flex items-center px-2 py-2 bg-white transition-all cursor-text group">
                        <FaMapMarkerAlt className="text-gray-400 group-focus-within:text-primary transition text-xl" />
                        <div className="ml-4 flex-1">
                            <input
                                type="text"
                                placeholder="Enter Destination"
                                className="w-full bg-transparent focus:outline-none text-gray-800 font-bold text-lg placeholder-gray-300"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Date Field */}
                <div className="md:col-span-3 w-full border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-4">
                    <label className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 ml-1">Date</label>
                    <div className="flex items-center px-2 py-2 bg-white transition-all cursor-pointer group">
                        <FaCalendarAlt className="text-gray-400 group-focus-within:text-primary transition text-xl" />
                        <div className="ml-4 flex-1">
                            <input
                                type="date"
                                className="w-full bg-transparent focus:outline-none text-gray-800 font-bold text-lg cursor-pointer placeholder-gray-300"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Travelers Field */}
                <div className="md:col-span-2 w-full">
                    <label className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 ml-1">Travelers</label>
                    <div className="flex items-center px-2 py-2 bg-white transition-all cursor-pointer group">
                        <FaUserFriends className="text-gray-400 group-focus-within:text-primary transition text-xl" />
                        <div className="ml-4 flex-1">
                            <input
                                type="number"
                                min="1"
                                className="w-full bg-transparent focus:outline-none text-gray-800 font-bold text-lg"
                                value={travelers}
                                onChange={(e) => setTravelers(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* Search Button */}
            <div className="w-full lg:w-auto mt-6 lg:mt-0 lg:ml-4">
                <button
                    type="submit"
                    className="w-full bg-danger text-white font-bold text-xl py-5 px-10 rounded-xl hover:bg-red-600 transition shadow-xl transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
                >
                    <FaSearch />
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchForm;
