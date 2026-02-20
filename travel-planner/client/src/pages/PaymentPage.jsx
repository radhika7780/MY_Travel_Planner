import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaGooglePay, FaCreditCard, FaLock } from 'react-icons/fa';
import { SiPhonepe, SiPaytm } from 'react-icons/si';

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { trip, bookingData } = location.state || {};

    // ✅ Clean fallback check
    if (!trip || !bookingData) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center p-10">
                <div>
                    <h2 className="text-xl font-bold mb-2">No booking details found</h2>
                    <p className="text-gray-500">Please start your booking again.</p>
                </div>
            </div>
        );
    }

    const handlePayment = (e) => {
        e.preventDefault();

        // Simulate payment success
        setTimeout(() => {
            navigate('/confirmation', {
                state: { trip, bookingData }
            });
        }, 1500);
    };

    return (
        <div className="bg-background min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Review & Pay
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Payment Section */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <FaLock className="text-green-500" /> Secure Payment
                        </h2>

                        <form onSubmit={handlePayment} className="space-y-4">

                            {/* UPI */}
                            <div className="border rounded-lg p-4">
                                <label className="flex items-center gap-3">
                                    <input type="radio" name="payment" defaultChecked />
                                    <div>
                                        <span className="font-semibold block">UPI</span>
                                        <div className="flex gap-2 text-2xl mt-1 text-gray-600">
                                            <FaGooglePay />
                                            <SiPhonepe />
                                            <SiPaytm />
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* Card */}
                            <div className="border rounded-lg p-4">
                                <label className="flex items-center gap-3">
                                    <input type="radio" name="payment" />
                                    <div>
                                        <span className="font-semibold block">Credit / Debit Card</span>
                                        <FaCreditCard className="mt-2 text-xl text-gray-600" />
                                    </div>
                                </label>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-semibold mb-2">
                                    Enter UPI ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="username@upi"
                                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 ring-primary"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition mt-6"
                            >
                                Pay ₹{bookingData.amount}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-xl p-6 border h-fit">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">
                            Order Summary
                        </h3>

                        <div className="mb-4 pb-4 border-b">
                            <p className="font-bold text-lg">
                                {trip.from} → {trip.to}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {bookingData.seats} Passenger(s)
                            </p>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Ticket Price</span>
                                <span>₹{bookingData.breakdown?.basePrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Taxes & Fees</span>
                                <span>₹{bookingData.breakdown?.taxes}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span>-₹{bookingData.breakdown?.discount}</span>
                            </div>
                        </div>

                        <div className="border-t pt-4 mt-4 flex justify-between font-bold text-xl text-gray-900">
                            <span>Total Payable</span>
                            <span>₹{bookingData.amount}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
