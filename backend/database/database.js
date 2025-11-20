const mongoose = require('mongoose');
const {join} = require('path');
const {withTimeout} = require("../utils/timeout");
require('dotenv').config({path: join(__dirname, '..', '.env')});

const connectionString = process.env.MONGODB_URI;
const options = {};

const connectDB = async (timeout) => {
    try {
        await withTimeout(
            mongoose.connect(connectionString, options),
            timeout,
        );

        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        throw error;
    }
};



module.exports = {
    connectDB,
    model: mongoose.model.bind(mongoose)
};