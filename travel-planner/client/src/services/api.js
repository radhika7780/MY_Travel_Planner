import axios from 'axios';

// Create Axios Instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response Interceptor (Optional: for global error handling)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

// --- API Functions ---

// 1. Fetch all trips with optional filters
export const fetchTrips = async (params = {}) => {
    try {
        const response = await api.get('/trips', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

// 2. Fetch a single trip by ID
export const fetchTripById = async (id) => {
    try {
        const response = await api.get(`/trips/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

// 3. Create a new booking
export const createBooking = async (bookingData) => {
    try {
        const response = await api.post('/bookings', bookingData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

// 4. Fetch bookings for a specific user
export const fetchUserBookings = async (userId) => {
    try {
        const response = await api.get(`/bookings/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

// 5. Initiate Payment (Mock)
export const initiatePayment = async (amount) => {
    try {
        const response = await api.post('/payment/initiate', { amount });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};


// 6. Verify Payment (Mock)
export const verifyPayment = async (paymentData) => {
    try {
        const response = await api.post('/payment/verify', paymentData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

export default api;
