const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        principle: {
            type: String,
            required: true,
            // examples: "loops", "functions", "conditions"
        },

        description: {
            type: String,
            required: true
        },

        order: {
            type: Number,
            required: true
        },

        isActive: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);


const Challenge = mongoose.models.Challenge || mongoose.model('Challenge', challengeSchema);
module.exports = Challenge;