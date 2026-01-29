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
        }
    ],
    teachers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher',
        }
    ]
});

const Class = mongoose.models.Class || mongoose.model('Class', classSchema);
module.exports = Class;