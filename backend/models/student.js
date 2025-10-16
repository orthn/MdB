const mongoose = require('mongoose');
const helpers = require("../services/helper");

const studentSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    gender: {type: String, enum: ['male', 'female'], required: true},
    isLocked: {type: Boolean, default: false},
});

// Auto-generate username and password before saving
studentSchema.pre('validate', async function (next) {
    const Student = mongoose.model('Student');

    if (!this.username && this.firstName && this.lastName) {
        let baseUsername = helpers.generateUsername(this.firstName, this.lastName);
        let username = baseUsername;
        let counter = 1;

        // Ensure uniqueness
        while (await Student.exists({username})) {
            username = `${baseUsername}${counter}`;
            counter++;
        }

        this.username = username;
    }

    if (!this.password) {
        this.password = helpers.generateRandomPassword();
    }

    next();
});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

module.exports = Student;