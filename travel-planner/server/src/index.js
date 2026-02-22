import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import userRoutes from './routes/userRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import authRoutes from './routes/authRoutes.js';

import connectDB from './config/db.js';
import { initAlertScheduler } from './jobs/alertScheduler.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Initialize Alert Scheduler
initAlertScheduler();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------- SECURITY MIDDLEWARE ----------------
app.use(helmet());

// Rate Limiting (for auth routes)
const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per minute
    message: { message: 'Too many requests. Try again after a minute.' }
});

// ---------------- GENERAL MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());

// Optional: Simple request logger (safe for production)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// ---------------- ROUTES ----------------
app.use('/api/users', userRoutes);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', paymentRoutes);

// Root Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Travel Planner API' });
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});