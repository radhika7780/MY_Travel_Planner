import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import TripDetails from './pages/TripDetails';
import PaymentPage from './pages/PaymentPage';
import TicketConfirmation from './pages/TicketConfirmation';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/trip/:id" element={<TripDetails />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/confirmation" element={<TicketConfirmation />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
