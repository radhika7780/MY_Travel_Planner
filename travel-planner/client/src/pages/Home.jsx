import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchForm from '../components/SearchForm';
import TripCard from '../components/TripCard';
import Footer from '../components/Footer';
import { fetchTrips } from '../services/api';
import { FaMapMarkedAlt, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const Home = () => {
    const navigate = useNavigate();
    const [popularTrips, setPopularTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularTrips = async () => {
            try {
                const data = await fetchTrips({ isPopular: true });
                setPopularTrips(data.slice(0, 6));
            } catch (error) {
                console.error('Failed to load popular trips:', error);
            } finally {
                setLoading(false);
            }
        };

        loadPopularTrips();
    }, []);

    const handleSearch = ({ from, to, date }) => {
        if (!from || !to) return;
        navigate(
            `/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date || '')}`
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white min-h-[600px] flex items-center justify-center pt-20">
                <div className="container mx-auto px-4 relative z-10 w-full flex flex-col items-center">
                    <div className="text-center mb-10 max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Explore the World with Comfort
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100">
                            India's No. 1 Bus Booking Platform.
                        </p>
                    </div>

                    <div className="w-full max-w-5xl">
                        <SearchForm onSearch={handleSearch} />
                    </div>
                </div>
            </div>

            {/* Popular Routes */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                        Popular Bus Routes
                    </h2>
                </div>

                {loading ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Loading routes...</p>
                    </div>
                ) : popularTrips.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No routes available.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {popularTrips.map(trip => (
                            <TripCard key={trip._id} trip={trip} />
                        ))}
                    </div>
                )}
            </div>

            {/* Features */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <FaMapMarkedAlt className="text-4xl text-primary mb-4 mx-auto" />
                        <h3 className="text-xl font-bold">Wide Coverage</h3>
                    </div>
                    <div>
                        <FaShieldAlt className="text-4xl text-green-500 mb-4 mx-auto" />
                        <h3 className="text-xl font-bold">Secure Payments</h3>
                    </div>
                    <div>
                        <FaHeadset className="text-4xl text-red-500 mb-4 mx-auto" />
                        <h3 className="text-xl font-bold">24/7 Support</h3>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
