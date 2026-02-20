import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Filters from '../components/Filters';
import TripCard from '../components/TripCard';
import { fetchTrips } from '../services/api';

const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Get search parameters
    const from = queryParams.get('from');
    const to = queryParams.get('to');
    const date = queryParams.get('date');

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTrips = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch trips based on search params
                const data = await fetchTrips({ from, to, date });
                setTrips(data);
                console.log("Trips from API:", data);

            } catch (err) {
                setError('Failed to fetch trips. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadTrips();
    }, [from, to, date]);

    return (
        <div className="bg-background min-h-screen">
            <Navbar />

            {/* Header Section */}
            <div className="bg-white shadow-sm py-4">
                <div className="container mx-auto px-4">
                    <h1 className="text-xl font-bold text-gray-800">
                        {from || 'Origin'} to {to || 'Destination'}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {loading ? 'Searching...' : `${trips.length} Buses found`} • {date || 'Any Date'}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
                {/* Filters Sidebar */}
                <div className="w-full md:w-1/4">
                    <Filters onFilter={() => { }} />
                </div>

                {/* Main Content */}
                <div className="w-full md:w-3/4">
                    {/* Sort Options */}
                    <div className="flex gap-4 mb-6 text-sm overflow-x-auto pb-2">
                        <button className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition whitespace-nowrap">Cheapest First</button>
                        <button className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition whitespace-nowrap">Fastest First</button>
                        <button className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition whitespace-nowrap">Departure Time</button>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            <div className="text-center py-10">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                                <p className="text-gray-500">Searching for the best routes...</p>
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
                                {error}
                            </div>
                        ) : trips.length === 0 ? (
                            <div className="text-center py-10 bg-white rounded-xl shadow-sm">
                                <p className="text-gray-500 text-lg">No buses found for this route.</p>
                                <p className="text-gray-400 text-sm mt-2">Try searching for different dates or locations.</p>
                            </div>
                        ) : (
                            trips.map(trip => (
                                <TripCard key={trip._id} trip={trip} />

                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
