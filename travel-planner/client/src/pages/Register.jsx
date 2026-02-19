import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaUser, FaEnvelope, FaUnlockAlt } from 'react-icons/fa';

const Register = () => {
    return (
        <div className="bg-background min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                    <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">Create Account</h1>
                    <p className="text-center text-gray-500 mb-8">Join us to book seamless travel</p>

                    <form className="space-y-4">
                        <div className="relative">
                            <FaUser className="absolute top-3.5 left-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:ring-2 ring-primary transition bg-gray-50 focus:bg-white"
                            />
                        </div>
                        <div className="relative">
                            <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:ring-2 ring-primary transition bg-gray-50 focus:bg-white"
                            />
                        </div>
                        <div className="relative">
                            <FaUnlockAlt className="absolute top-3.5 left-3 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:ring-2 ring-primary transition bg-gray-50 focus:bg-white"
                            />
                        </div>

                        <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg mt-2">
                            Sign Up
                        </button>
                    </form>

                    <p className="text-center mt-8 text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
