import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUserFriends, FaSearch, FaExchangeAlt } from 'react-icons/fa';

const SearchForm = ({ onSearch }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [travelers, setTravelers] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!onSearch) return;
        onSearch({ from: from.trim(), to: to.trim(), date, travelers });
    };

    const handleSwap = () => {
        setFrom(to);
        setTo(from);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-[0_20px_50px_rgba(8,112,184,0.15)] rounded-[2rem] p-4 lg:p-2 -mt-16 flex flex-col lg:flex-row items-stretch lg:items-center relative z-20 border border-white/50 backdrop-blur-sm"
        >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-11 items-center">

                {/* From Field */}
                <div className="md:col-span-3 p-4 border-b md:border-b-0 md:border-r border-gray-100 group transition-all">
                    <label className="block text-[10px] font-black uppercase tracking-[0.1em] text-blue-400 mb-1 ml-9">From</label>
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                            <FaMapMarkerAlt className="text-sm" />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Source"
                            className="bg-transparent focus:outline-none text-gray-800 font-bold text-lg placeholder-gray-300 w-full"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Swap Component */}
                <div className="absolute left-[26%] top-1/2 -translate-y-1/2 z-30 hidden md:block">
                    <button
                        type="button"
                        onClick={handleSwap}
                        className="bg-white border border-gray-100 p-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all text-blue-500 hover:text-blue-600 group"
                    >
                        <FaExchangeAlt className="group-hover:rotate-180 transition-transform duration-500" />
                    </button>
                </div>

                {/* To Field */}
                <div className="md:col-span-3 p-4 border-b md:border-b-0 md:border-r border-gray-100 pl-4 md:pl-8 group transition-all">
                    <label className="block text-[10px] font-black uppercase tracking-[0.1em] text-blue-400 mb-1 ml-9">To</label>
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                            <FaMapMarkerAlt className="text-sm" />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Destination"
                            className="bg-transparent focus:outline-none text-gray-800 font-bold text-lg placeholder-gray-300 w-full"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Date Field */}
                <div className="md:col-span-3 p-4 border-b md:border-b-0 md:border-r border-gray-100 group transition-all">
                    <label className="block text-[10px] font-black uppercase tracking-[0.1em] text-blue-400 mb-1 ml-9">Date</label>
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                            <FaCalendarAlt className="text-sm" />
                        </div>
                        <input
                            type="date"
                            className="bg-transparent focus:outline-none text-gray-800 font-bold text-lg w-full cursor-pointer"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Travelers Field */}
                <div className="md:col-span-2 p-4 group transition-all">
                    <label className="block text-[10px] font-black uppercase tracking-[0.1em] text-blue-400 mb-1 ml-9">Travelers</label>
                    <div className="flex items-center gap-3 px-2 text-gray-800 font-bold text-lg">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                            <FaUserFriends className="text-sm" />
                        </div>
                        <div className="flex items-center gap-2">
                            <button type="button" onClick={() => setTravelers(Math.max(1, travelers - 1))} className="hover:text-blue-500">-</button>
                            <span className="w-4 text-center">{travelers}</span>
                            <button type="button" onClick={() => setTravelers(travelers + 1)} className="hover:text-blue-500">+</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Pill Button */}
            <div className="p-2">
                <button
                    type="submit"
                    className="w-full lg:w-[180px] h-[64px] rounded-full font-black uppercase tracking-widest text-sm bg-gradient-to-r from-red-500 to-rose-600 shadow-lg hover:shadow-red-200 transition-all duration-300 flex items-center justify-center gap-3 text-white group"
                >
                    <FaSearch className="group-hover:scale-110 transition-transform duration-300" />
                    <span>Search</span>
                </button>
            </div>
        </form>
    );
};

export default SearchForm;
