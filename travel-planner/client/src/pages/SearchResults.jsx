import React from 'react';
import Navbar from '../components/Navbar';
import Filters from '../components/Filters';
import TripCard from '../components/TripCard';

const SearchResults = () => {
    // Mock results
    const results = [
        { id: 1, name: 'Hyderabad → Dwarka', vehicleType: 'Scania Multi-Axle', duration: '14h', price: 1500, seatsAvailable: 8 },
        { id: 2, name: 'Mumbai → Goa', vehicleType: 'Volvo 9600 Sleeper', duration: '10h', price: 1200, seatsAvailable: 15 },
        { id: 3, name: 'Delhi → Manali', vehicleType: 'Bharat Benz Glider', duration: '12h', price: 1800, seatsAvailable: 2 },
    ];

    return (
        <div className="bg-background min-h-screen">
            <Navbar />

            {/* Breadcrumb or secondary header could go here */}
            <div className="bg-white shadow-sm py-4">
                <div className="container mx-auto px-4">
                    <h1 className="text-xl font-bold text-gray-800">Hyderabad to Dwarka</h1>
                    <p className="text-sm text-gray-500">24 Buses found • 20 Feb 2026</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
                {/* Filters Sidebar */}
                <div className="w-full md:w-1/4">
                    <Filters onFilter={() => { }} />
                </div>

                {/* Main Content */}
                <div className="w-full md:w-3/4">
                    {/* Sort Options (Optional) */}
                    <div className="flex gap-4 mb-6 text-sm overflow-x-auto pb-2">
                        <button className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition whitespace-nowrap">Cheapest First</button>
                        <button className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition whitespace-nowrap">Fastest First</button>
                        <button className="bg-white px-4 py-2 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition whitespace-nowrap">Departure Time</button>
                    </div>

                    <div className="space-y-4">
                        {results.map(trip => (
                            <TripCard key={trip.id} trip={trip} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
