import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import SearchForm from '../components/SearchForm';
import TripCard from '../components/TripCard';
import { FaMapMarkedAlt, FaShieldAlt, FaHeadset, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Home = () => {
    const handleSearch = (searchParams) => {
        console.log('Search params:', searchParams);
        // Navigate to search results
    };

    // Mock data for Popular Routes
    const popularRoutes = [
        { id: 1, name: 'Hyderabad → Dwarka', vehicleType: 'Scania Multi-Axle', duration: '14h', price: 1500, seatsAvailable: 8, rating: 4.8 },
        { id: 2, name: 'Mumbai → Goa', vehicleType: 'Volvo 9600 Sleeper', duration: '10h', price: 1200, seatsAvailable: 15, rating: 4.5 },
        { id: 3, name: 'Delhi → Manali', vehicleType: 'Bharat Benz Glider', duration: '12h', price: 1800, seatsAvailable: 5, rating: 4.9 },
        { id: 4, name: 'Bangalore → Ooty', vehicleType: 'Electric AC Seater', duration: '7h', price: 800, seatsAvailable: 20, rating: 4.2 },
        { id: 5, name: 'Chennai → Pondicherry', vehicleType: 'AC Seater', duration: '3h', price: 450, seatsAvailable: 32, rating: 4.0 },
        { id: 6, name: 'Pune → Mahabaleshwar', vehicleType: 'Volvo AC', duration: '4h', price: 550, seatsAvailable: 12, rating: 4.6 },
    ];

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white min-h-[600px] flex items-center justify-center pt-20">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <div className="container mx-auto px-4 relative z-10 w-full flex flex-col items-center">
                    <div className="text-center mb-10 max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
                            Explore the World with Comfort
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 opacity-90">
                            India's No. 1 Bus Booking Platform. Trusted by over 20 Million Travelers.
                        </p>
                    </div>

                    {/* Search Form Centered */}
                    <div className="w-full max-w-5xl">
                        <SearchForm onSearch={handleSearch} />
                    </div>
                </div>

                {/* Wave Shape Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 60C480 60 600 90 720 100C840 110 960 100 1080 85C1200 70 1320 50 1380 40L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB" />
                    </svg>
                </div>
            </div>

            {/* Popular Routes Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">Popular Bus Routes</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Discover the most traveled paths across the country. Book your seat on the most comfortable buses available.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {popularRoutes.map(trip => (
                        <TripCard key={trip.id} trip={trip} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="bg-white border-2 border-primary text-primary font-bold py-3 px-8 rounded-full hover:bg-primary hover:text-white transition duration-300 shadow-md">
                        View All Routes
                    </button>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                <FaMapMarkedAlt />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Unmatched Coverage</h3>
                            <p className="text-gray-500">Connecting over 1,000 cities with 5,000+ routes across the country.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-green-100 text-secondary rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                <FaShieldAlt />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">100% Secure</h3>
                            <p className="text-gray-500">We ensure your data and payments are always safe with standard encryption.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-red-100 text-danger rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                <FaHeadset />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Support</h3>
                            <p className="text-gray-500">Our customer support team is always available to assist you with your travel needs.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h4 className="text-white text-lg font-bold mb-4">MyTravelPlanner</h4>
                            <p className="text-sm opacity-80">Making travel simple, affordable, and enjoyable. Book your next journey with us today.</p>
                        </div>
                        <div>
                            <h4 className="text-white text-lg font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                                <li><a href="#" className="hover:text-white">T&C</a></li>
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-lg font-bold mb-4">Top Routes</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Mumbai to Goa</a></li>
                                <li><a href="#" className="hover:text-white">Bangalore to Hyderabad</a></li>
                                <li><a href="#" className="hover:text-white">Delhi to Manali</a></li>
                                <li><a href="#" className="hover:text-white">Chennai to Bangalore</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-lg font-bold mb-4">Follow Us</h4>
                            <div className="flex space-x-4">
                                <div className="flex space-x-4">
                                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 text-white transition-colors duration-300">
                                        <FaInstagram className="text-xl" />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 text-white transition-colors duration-300">
                                        <FaTwitter className="text-xl" />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 text-white transition-colors duration-300">
                                        <FaFacebook className="text-xl" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm">
                        <p>&copy; 2026 My Travel Planner. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
