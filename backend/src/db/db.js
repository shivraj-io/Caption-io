const mongoose = require('mongoose');

function connectDB() {
    if (!process.env.MONGODB_URL) {
        console.warn('MONGODB_URL not set. Set it in .env to connect to MongoDB.');
    }
    return mongoose
        .connect(process.env.MONGODB_URL, { autoIndex: true })
        .then(() => {
            console.log('MongoDB connected');
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err.message);
            throw err;
        });
}

module.exports = connectDB;