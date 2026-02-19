import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaUnlockAlt, FaEnvelope, FaGoogle, FaFacebook } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Mock login
        localStorage.setItem('token', 'mock-token');
        navigate('/');
    };

    return (
        <div className="bg-background min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                    <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">Welcome Back</h1>
                    <p className="text-center text-gray-500 mb-8">Login to manage your bookings</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:ring-2 ring-primary transition bg-gray-50 focus:bg-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative">
                            <FaUnlockAlt className="absolute top-3.5 left-3 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:ring-2 ring-primary transition bg-gray-50 focus:bg-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                            <a href="#" className="text-sm text-primary font-semibold hover:underline">Forgot Password?</a>
                        </div>

                        <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg">
                            Login
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <span className="text-xs text-gray-400 font-semibold">OR CONTINUE WITH</span>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 border py-2.5 rounded-lg hover:bg-gray-50 transition">
                            <FaGoogle className="text-red-500" /> Google
                        </button>
                        <button className="flex items-center justify-center gap-2 border py-2.5 rounded-lg hover:bg-gray-50 transition">
                            <FaFacebook className="text-blue-600" /> Facebook
                        </button>
                    </div>

                    <p className="text-center mt-8 text-sm text-gray-600">
                        Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
