const mongoose = require('mongoose');
const helpers = require("../services/helper");

const userSettingsSchema = new mongoose.Schema({
    showHints: {
        type: Boolean,
        default: true
    },
    showAnimations: {
        type: Boolean,
        default: true
    },
    theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'dark'
    }
}, {_id: false});

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    gender: {type: String, enum: ['male', 'female'], required: true},
    isLocked: {type: Boolean, default: false},
    role: {type: String, enum: ['student', 'teacher'], default: 'student'},
    settings: {
        type: userSettingsSchema,
        default: () => ({})
    },
    classes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    absolvedLevels: []
});

// Auto-generate username and password before saving
userSchema.pre('validate', async function (next) {
    const User = mongoose.model('User');

    if (!this.username && this.firstName && this.lastName) {
        let baseUsername = helpers.generateUsername(this.firstName, this.lastName);
        let username = baseUsername;
        let counter = 1;

        // Ensure uniqueness
        while (await User.exists({username})) {
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

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;