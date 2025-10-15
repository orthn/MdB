const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // reference User model
            unique: true, // ensures each user appears only once in this array
        }
    ]
});

const Class = mongoose.models.Class || mongoose.model('Class', classSchema);
module.exports = Class;