import React from 'react';
import { FaTwitter, FaLinkedin, FaInstagram, FaBus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 text-2xl font-bold mb-4">
                            <FaBus className="text-blue-500" />
                            <span>Travel<span className="text-blue-500">Planner</span></span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            India's No. 1 Bus Booking Platform. Providing safe, comfortable, and reliable travel experiences across the country.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Explore</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/" className="hover:text-blue-500 transition">Popular Routes</Link></li>
                            <li><Link to="/" className="hover:text-blue-500 transition">Bus Operators</Link></li>
                            <li><Link to="/" className="hover:text-blue-500 transition">Offers</Link></li>
                            <li><Link to="/" className="hover:text-blue-500 transition">Mobile App</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/" className="hover:text-blue-500 transition">Track My Bus</Link></li>
                            <li><Link to="/" className="hover:text-blue-500 transition">Cancellation</Link></li>
                            <li><Link to="/" className="hover:text-blue-500 transition">Print Ticket</Link></li>
                            <li><Link to="/" className="hover:text-blue-500 transition">Help & FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Follow Us</h4>
                        <div className="flex gap-4 mb-6">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition transform hover:-translate-y-1">
                                <FaTwitter className="text-lg" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition transform hover:-translate-y-1">
                                <FaLinkedin className="text-lg" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition transform hover:-translate-y-1">
                                <FaInstagram className="text-lg" />
                            </a>
                        </div>
                        <p className="text-gray-400 text-sm">Download our App for best offers!</p>
                    </div>
                </div>

                {/* Brands / Partners */}
                <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition duration-500">
                        <span className="text-xl font-black italic tracking-tighter">VOLVO</span>
                        <span className="text-xl font-black italic tracking-tighter">SCANIA</span>
                        <span className="text-xl font-black italic tracking-tighter">MERCEDES-BENZ</span>
                        <span className="text-xl font-black italic tracking-tighter">ASHOK LEYLAND</span>
                    </div>
                    <div className="text-gray-500 text-sm">
                        &copy; 2026 TravelPlanner. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
