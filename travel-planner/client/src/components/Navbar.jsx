import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-tight hover:text-gray-200 transition">
                    My Travel Planner
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="hover:text-gray-200 transition font-medium">Home</Link>
                    <Link to="/my-bookings" className="hover:text-gray-200 transition font-medium">My Bookings</Link>
                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-2">
                                <FaUserCircle className="text-xl" />
                                {user.name}
                            </span>
                            <button
                                onClick={logout}
                                className="bg-white text-primary px-4 py-1.5 rounded-full font-semibold hover:bg-gray-100 transition shadow-sm"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="hover:underline font-medium">Login</Link>
                            <Link
                                to="/register"
                                className="bg-white text-primary px-4 py-1.5 rounded-full font-semibold hover:bg-gray-100 transition shadow-sm"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-blue-700 p-4 space-y-4">
                    <Link to="/" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/my-bookings" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>My Bookings</Link>
                    {user ? (
                        <>
                            <div className="flex items-center gap-2 py-2">
                                <FaUserCircle />
                                <span>{user.name}</span>
                            </div>
                            <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left font-bold">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Login</Link>
                            <Link to="/register" className="block font-bold bg-white text-primary px-3 py-1 rounded inline-block" onClick={() => setIsOpen(false)}>Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
