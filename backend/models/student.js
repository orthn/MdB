const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String, required: true,
    }, lastName: {
        type: String, required: true
    }, username: {
        type: String, required: true, unique: true
    }, password: {
        type: String, required: true
    }, gender: {
        type: String, enum: ['male', 'female'], required: true
    }, isLocked: {
        type: Boolean, default: false
    }
})

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

module.exports = Student;