const mongoose = require('mongoose');
const {join} = require('path');
require('dotenv').config({path: join(__dirname, '..', '.env')});

const connectionString = process.env.MONGODB_URI;
const options = {};

const connectDB = async () => {
    try {
        await mongoose.connect(connectionString, options);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = {
    connectDB,
    model: mongoose.model.bind(mongoose)
};