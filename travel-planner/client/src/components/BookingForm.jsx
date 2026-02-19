import React, { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaChair, FaUtensils } from 'react-icons/fa';

const BookingForm = ({ trip, onBook }) => {
    const [seats, setSeats] = useState(1);
    const [food, setFood] = useState(false);
    const [passenger, setPassenger] = useState({ name: '', phone: '', email: '' });

    // Calculate details
    const basePrice = trip.price * seats;
    const foodPrice = food ? (250 * seats) : 0;
    const discount = trip.offerPrice || 0;
    const taxes = Math.round((basePrice + foodPrice) * 0.18); // 18% GST
    const finalAmount = basePrice + foodPrice + taxes - discount;

    const handleSubmit = (e) => {
        e.preventDefault();
        onBook({
            passenger,
            seats,
            food,
            amount: finalAmount,
            breakdown: { basePrice, foodPrice, taxes, discount }
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gray-50 p-4 border-b">
                <h3 className="text-lg font-bold text-gray-800">Booking Summary</h3>
                <p className="text-sm text-gray-500">Complete your details to reserve seats</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Seats */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Seats</label>
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border-r"
                            onClick={() => setSeats(Math.max(1, seats - 1))}
                        >-</button>
                        <div className="flex-1 text-center font-bold text-gray-800 flex items-center justify-center gap-2">
                            <FaChair className="text-gray-400" /> {seats} Seats
                        </div>
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border-l"
                            onClick={() => setSeats(seats + 1)}
                        >+</button>
                    </div>
                </div>

                {/* Passenger Details */}
                <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">Passenger Details</label>
                    <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ring-primary">
                        <FaUser className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full outline-none text-sm"
                            value={passenger.name}
                            onChange={e => setPassenger({ ...passenger, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ring-primary">
                        <FaPhone className="text-gray-400 mr-2" />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full outline-none text-sm"
                            value={passenger.phone}
                            onChange={e => setPassenger({ ...passenger, phone: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ring-primary">
                        <FaEnvelope className="text-gray-400 mr-2" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full outline-none text-sm"
                            value={passenger.email}
                            onChange={e => setPassenger({ ...passenger, email: e.target.value })}
                            required
                        />
                    </div>
                </div>

                {/* Extras */}
                <div>
                    <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                        <div className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${food ? 'bg-primary border-primary text-white' : 'border-gray-300'}`}>
                                {food && '✓'}
                            </div>
                            <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <FaUtensils className="text-orange-500" /> Add Meals
                            </span>
                        </div>
                        <span className="text-sm font-bold text-gray-800">+₹250/person</span>
                        <input type="checkbox" className="hidden" checked={food} onChange={() => setFood(!food)} />
                    </label>
                </div>

                {/* Price Breakdown */}
                <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                        <span>Base Fare ({seats}x)</span>
                        <span>₹{basePrice}</span>
                    </div>
                    {food && (
                        <div className="flex justify-between text-gray-600">
                            <span>Meals</span>
                            <span>₹{foodPrice}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                        <span>Taxes (18%)</span>
                        <span>₹{taxes}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-₹{discount}</span>
                    </div>
                    <div className="border-t border-blue-200 pt-2 mt-2 flex justify-between font-bold text-lg text-gray-900">
                        <span>Total</span>
                        <span>₹{finalAmount}</span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-green-600 transition shadow-lg"
                >
                    Proceed to Pay ₹{finalAmount}
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
