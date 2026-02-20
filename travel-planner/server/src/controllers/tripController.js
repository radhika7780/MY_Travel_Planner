import Trip from '../models/Trip.js';

// Get all trips with optional filters
export const getTrips = async (req, res) => {
    try {
        const { from, to, date } = req.query;

        let query = {};

        if (from && from.trim()) {
            query.from = { $regex: new RegExp(from.trim(), 'i') };
        }

        if (to && to.trim()) {
            query.to = { $regex: new RegExp(to.trim(), 'i') };
        }

        // Note: Date filtering can be added here if dates are stored in the model
        // For now, we perform route-based search as per user dummy data structure

        const trips = await Trip.find(query);

        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trips', error: error.message });
    }
};

// Get single trip by ID
export const getTripById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Backend: Received request for trip ID: ${id}`);

        // Validate ObjectId format to avoid CastError
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            console.warn(`Backend: Invalid ObjectId format received: ${id}`);
            return res.status(400).json({ message: 'Invalid trip ID format' });
        }

        const trip = await Trip.findById(id);

        if (!trip) {
            console.warn(`Backend: Trip not found for ID: ${id}`);
            return res.status(404).json({ message: 'Trip not found in database' });
        }

        console.log(`Backend: Successfully found trip: ${trip.from} to ${trip.to}`);
        res.status(200).json(trip);
    } catch (error) {
        console.error(`Backend Error fetching trip [${req.params.id}]:`, error.message);
        res.status(500).json({ message: 'Internal Server Error fetching trip', error: error.message });
    }
};

// Controller for admin to create trips
export const createTrip = async (req, res) => {
    try {
        const trip = await Trip.create(req.body);
        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json({ message: 'Error creating trip', error: error.message });
    }
};
