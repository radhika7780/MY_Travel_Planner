import axios from 'axios';

// Create Axios Instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor to attach JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// Response Interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized globally (e.g., logout or token cleanup)
            console.error('Unauthorized access - potential token expiration');
            localStorage.removeItem('token');
        }
        console.error('API Error:', error.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

// --- API Functions ---

// 1. Auth Functions
export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

export const getProfile = async () => {
    try {
        const response = await api.get('/auth/me');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

// 2. Trip Functions
export const fetchTrips = async (params = {}) => {
    try {
        const response = await api.get('/trips', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

export const fetchTripById = async (id) => {
    try {
        const response = await api.get(`/trips/${id}`);
        return response.data;
    } catch (error) {
        console.error(`API Error in fetchTripById. ID ${id}:`, error.response?.status, error.response?.data || error.message);
        throw error.response?.data || { message: error.message || 'Network Error' };
    }
};

// 3. Booking Functions
export const createBooking = async (bookingData) => {
    try {
        const response = await api.post('/bookings', bookingData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

export const fetchUserBookings = async (userId) => {
    try {
        const response = await api.get(`/bookings/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

// 4. Payment Functions
export const initiatePayment = async (amount) => {
    try {
        const response = await api.post('/payment/initiate', { amount });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

export const verifyPayment = async (paymentData) => {
    try {
        const response = await api.post('/payment/verify', paymentData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Network Error' };
    }
};

export default api;
