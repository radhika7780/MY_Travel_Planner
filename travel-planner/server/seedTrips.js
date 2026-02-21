import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Trip from './src/models/Trip.js';

// Setup environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1);
}

const routes = [
    { from: 'Hyderabad', to: 'Bangalore', duration: '7h 30m', distance: 570 },
    { from: 'Bangalore', to: 'Hyderabad', duration: '7h 45m', distance: 570 },
    { from: 'Mumbai', to: 'Goa', duration: '12h 00m', distance: 590 },
    { from: 'Goa', to: 'Mumbai', duration: '12h 15m', distance: 590 },
    { from: 'Delhi', to: 'Jaipur', duration: '5h 30m', distance: 280 },
    { from: 'Jaipur', to: 'Delhi', duration: '5h 45m', distance: 280 },
    { from: 'Chennai', to: 'Pondicherry', duration: '3h 30m', distance: 170 },
    { from: 'Pondicherry', to: 'Chennai', duration: '3h 45m', distance: 170 },
    { from: 'Pune', to: 'Mahabaleshwar', duration: '3h 00m', distance: 120 },
    { from: 'Mahabaleshwar', to: 'Pune', duration: '3h 15m', distance: 120 },
    { from: 'Kolkata', to: 'Digha', duration: '4h 30m', distance: 180 },
    { from: 'Digha', to: 'Kolkata', duration: '4h 45m', distance: 180 },
    { from: 'Ahmedabad', to: 'Udaipur', duration: '5h 00m', distance: 260 },
    { from: 'Udaipur', to: 'Ahmedabad', duration: '5h 15m', distance: 260 },
    { from: 'Lucknow', to: 'Varanasi', duration: '6h 30m', distance: 320 },
    { from: 'Varanasi', to: 'Lucknow', duration: '6h 45m', distance: 320 },
    { from: 'Bangalore', to: 'Mysore', duration: '3h 00m', distance: 150 },
    { from: 'Mysore', to: 'Bangalore', duration: '3h 15m', distance: 150 },
    { from: 'Mumbai', to: 'Pune', duration: '3h 00m', distance: 150 },
    { from: 'Pune', to: 'Mumbai', duration: '3h 15m', distance: 150 }
];

const vehicleTypes = [
    'Volvo Multi-Axle AC Sleeper',
    'Scania Touring AC Seater',
    'Mercedes-Benz AC Seater',
    'Ashok Leyland Non-AC Seater',
    'BharatBenz AC Sleeper'
];

const timings = [
    { dep: '06:00', arr: 'plus_duration' },
    { dep: '14:30', arr: 'plus_duration' },
    { dep: '22:00', arr: 'plus_duration' },
    { dep: '23:15', arr: 'plus_duration' }
];

const calculateArrivalTime = (departureTime, durationStr) => {
    const [depHours, depMins] = departureTime.split(':').map(Number);
    const [durHours, durMins] = durationStr.match(/\d+/g).map(Number);

    let totalMins = depHours * 60 + depMins + durHours * 60 + (durMins || 0);
    let arrHours = Math.floor(totalMins / 60) % 24;
    let arrMins = totalMins % 60;

    return `${arrHours.toString().padStart(2, '0')}:${arrMins.toString().padStart(2, '0')}`;
};

const seedTrips = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing trips (Optional, but usually good for seeding fresh)
        await Trip.deleteMany({});
        console.log('Cleared existing trips.');

        const tripsData = [];
        let popularCount = 0;

        for (let i = 0; i < 40; i++) {
            const route = routes[i % routes.length];
            const vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
            const isAC = vehicleType.includes('AC');
            const timing = timings[Math.floor(Math.random() * timings.length)];

            // Random date between 7 and 10 days from now
            const daysAhead = 7 + Math.floor(Math.random() * 4);
            const departureDate = new Date();
            departureDate.setDate(departureDate.getDate() + daysAhead);
            const [h, m] = timing.dep.split(':');
            departureDate.setHours(parseInt(h), parseInt(m), 0, 0);

            const arrivalTime = calculateArrivalTime(timing.dep, route.duration);
            const totalSeats = vehicleType.includes('Sleeper') ? 30 : 45;

            // 6-8 trips as popular
            let isPopular = false;
            if (popularCount < 8 && Math.random() > 0.7) {
                isPopular = true;
                popularCount++;
            }

            tripsData.push({
                from: route.from,
                to: route.to,
                departureTime: timing.dep,
                departureDateTime: departureDate,
                arrivalTime: arrivalTime,
                duration: route.duration,
                vehicleType: vehicleType,
                price: isAC ? 800 + Math.floor(Math.random() * 700) : 400 + Math.floor(Math.random() * 300),
                seatsAvailable: totalSeats,
                totalSeats: totalSeats,
                ac: isAC,
                foodIncluded: isAC && Math.random() > 0.5,
                specialFacilities: isAC ? ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket'] : ['Emergency Exit', 'First Aid'],
                discountPercentage: Math.random() > 0.7 ? 10 : 0,
                isPopular: isPopular
            });
        }

        // Final check to ensure at least 6 popular trips
        if (popularCount < 6) {
            for (let i = 0; i < 6 - popularCount; i++) {
                tripsData[i].isPopular = true;
            }
        }

        await Trip.insertMany(tripsData);
        console.log('Trips seeded successfully');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedTrips();
