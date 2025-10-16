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
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student', // reference Student model
            unique: true, // ensures each user appears only once in this array
        }
    ],
    teachers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher',
            unique: true,
        }
    ]
});

const Class = mongoose.models.Class || mongoose.model('Class', classSchema);
module.exports = Class;