import React from 'react';
import Navbar from '../components/Navbar';
import SearchForm from '../components/SearchForm';
import TripCard from '../components/TripCard';
import { FaMapMarkedAlt, FaStar } from 'react-icons/fa';

const Home = () => {
    const handleSearch = (searchParams) => {
        console.log('Search params:', searchParams);
        // Navigate to search results
    };

    // Mock data for Popular Routes
    const popularRoutes = [
        { id: 1, name: 'Hyderabad → Dwarka', vehicleType: 'Scania Multi-Axle', duration: '14h', price: 1500, seatsAvailable: 8 },
        { id: 2, name: 'Mumbai → Goa', vehicleType: 'Volvo 9600 Sleeper', duration: '10h', price: 1200, seatsAvailable: 15 },
        { id: 3, name: 'Delhi → Manali', vehicleType: 'Bharat Benz Glider', duration: '12h', price: 1800, seatsAvailable: 5 },
        { id: 4, name: 'Bangalore → Ooty', vehicleType: 'Electric AC Seater', duration: '7h', price: 800, seatsAvailable: 20 },
    ];

    return (
        <div className="bg-background min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white pb-32 pt-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-md">
                        Explore the World with Comfort
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Book bus tickets effortlessly. 10,000+ routes, premium AC sleepers, and instant refunds.
                    </p>
                    <div className="flex justify-center gap-4 text-sm font-semibold">
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                            <FaMapMarkedAlt /> 500+ Cities
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                            <FaStar /> 4.8/5 Rated
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Form Container */}
            <div className="container mx-auto px-4 -mt-20 mb-16 relative z-10">
                <SearchForm onSearch={handleSearch} />
            </div>

            {/* Popular Routes Section */}
            <div className="container mx-auto px-4 mb-20">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Popular Routes</h2>
                        <p className="text-gray-500 mt-2">Top rated routes by our travelers</p>
                    </div>
                    <button className="text-primary font-semibold hover:underline">View All Routes</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {popularRoutes.map(trip => (
                        <TripCard key={trip.id} trip={trip} />
                    ))}
                </div>
            </div>

            {/* Features/Trust Section or Footer could go here */}
            <footer className="bg-gray-800 text-gray-300 py-12 mt-auto">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2026 My Travel Planner. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
