const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    }, isTeacher: {
        type: Boolean, default: false
    }, isLocked: {
        type: Boolean, default: false
    }
})

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;