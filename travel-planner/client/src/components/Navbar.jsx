import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle, FaBars, FaTimes, FaBus } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    // Dynamic classes based on scroll and page
    const navClass = `fixed w-full z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-white text-gray-800 shadow-md py-3' : 'bg-transparent text-white py-5'
        }`;

    const logoClass = `text-2xl font-bold tracking-tight flex items-center gap-2 ${scrolled || !isHome ? 'text-primary' : 'text-white'
        }`;

    const linkClass = `font-medium hover:text-secondary transition ${scrolled || !isHome ? 'text-gray-600' : 'text-blue-100 hover:text-white'
        }`;

    return (
        <nav className={navClass}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className={logoClass}>
                    <FaBus className="text-3xl" />
                    <span>MyTravel<span className={scrolled || !isHome ? 'text-gray-800' : 'text-white'}>Planner</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className={linkClass}>Home</Link>
                    <Link to="/my-bookings" className={linkClass}>My Bookings</Link>
                    <Link to="/contact" className={linkClass}>Contact Us</Link>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-2 font-medium">
                                <FaUserCircle className="text-xl" />
                                {user.name}
                            </span>
                            <button
                                onClick={logout}
                                className="bg-danger text-white px-5 py-2 rounded-full font-semibold hover:bg-red-600 transition shadow-sm text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className={linkClass}>Login</Link>
                            <Link
                                to="/register"
                                className={`px-6 py-2 rounded-full font-bold transition shadow-sm text-sm ${scrolled || !isHome
                                        ? 'bg-primary text-white hover:bg-blue-700'
                                        : 'bg-white text-primary hover:bg-gray-100'
                                    }`}
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
                <div className="md:hidden bg-white text-gray-800 absolute top-full left-0 w-full shadow-lg border-t animate-fade-in-down">
                    <div className="flex flex-col p-4 space-y-4">
                        <Link to="/" className="font-medium hover:text-primary" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/my-bookings" className="font-medium hover:text-primary" onClick={() => setIsOpen(false)}>My Bookings</Link>
                        <div className="h-px bg-gray-100"></div>
                        {user ? (
                            <>
                                <div className="flex items-center gap-2 py-2 text-primary font-bold">
                                    <FaUserCircle />
                                    <span>{user.name}</span>
                                </div>
                                <button onClick={() => { logout(); setIsOpen(false); }} className="text-left text-danger font-bold">Logout</button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Link to="/login" className="font-medium hover:text-primary" onClick={() => setIsOpen(false)}>Login</Link>
                                <Link to="/register" className="bg-primary text-white text-center py-2 rounded-lg font-bold" onClick={() => setIsOpen(false)}>Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
