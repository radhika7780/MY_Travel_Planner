import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Trip from './models/Trip.js';

dotenv.config();

const trips = [
    {
        from: "Hyderabad",
        to: "Dwarka",
        departureTime: "22:00",
        arrivalTime: "10:30",
        duration: "14h",
        vehicleType: "Scania Multi-Axle",
        price: 1500,
        seatsAvailable: 8,
        totalSeats: 40,
        ac: true,
        foodIncluded: false,
        specialFacilities: ["WiFi", "Charging Point", "Water Bottle"],
        discountPercentage: 5
    },
    {
        from: "Mumbai",
        to: "Goa",
        departureTime: "21:00",
        arrivalTime: "07:00",
        duration: "10h",
        vehicleType: "Volvo 9600 Sleeper",
        price: 1200,
        seatsAvailable: 15,
        totalSeats: 30,
        ac: true,
        foodIncluded: true,
        specialFacilities: ["WiFi", "Blanket", "Charging Point", "Dinner"],
        discountPercentage: 0
    },
    {
        from: "Delhi",
        to: "Manali",
        departureTime: "20:00",
        arrivalTime: "08:00",
        duration: "12h",
        vehicleType: "Bharat Benz Glider",
        price: 1800,
        seatsAvailable: 5,
        totalSeats: 36,
        ac: true,
        foodIncluded: false,
        specialFacilities: ["Heating", "Charging Point"],
        discountPercentage: 0
    },
    {
        from: "Bangalore",
        to: "Ooty",
        departureTime: "06:00",
        arrivalTime: "13:00",
        duration: "7h",
        vehicleType: "Electric AC Seater",
        price: 800,
        seatsAvailable: 20,
        totalSeats: 40,
        ac: true,
        foodIncluded: false,
        specialFacilities: ["WiFi", "Charging Point"],
        discountPercentage: 0
    },
    {
        from: "Chennai",
        to: "Pondicherry",
        departureTime: "09:00",
        arrivalTime: "12:00",
        duration: "3h",
        vehicleType: "AC Seater",
        price: 450,
        seatsAvailable: 32,
        totalSeats: 40,
        ac: true,
        foodIncluded: false,
        specialFacilities: [],
        discountPercentage: 0
    },
    {
        from: "Pune",
        to: "Mahabaleshwar",
        departureTime: "07:00",
        arrivalTime: "11:00",
        duration: "4h",
        vehicleType: "Volvo AC",
        price: 550,
        seatsAvailable: 12,
        totalSeats: 24,
        ac: true,
        foodIncluded: true,
        specialFacilities: ["Snacks", "Water Bottle"],
        discountPercentage: 0
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // Clear existing trips
        await Trip.deleteMany();

        // Insert new trips
        await Trip.insertMany(trips);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
