const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true},
    challengeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true, index: true},
    levelId: {type: mongoose.Schema.Types.ObjectId, ref: 'Level', required: true, index: true},
    completed: {type: Boolean, default: false},
    attempts: {type: Number, default: 0},
    completedAt: {type: Date},
    xpEarned: {type: Number,default: 0}
}, {timestamps: true});

// each user can have only ONE progress entry per level
userProgressSchema.index({userId: 1, levelId: 1}, {unique: true});

const UserProgress = mongoose.models.UserProgress || mongoose.model('UserProgress', userProgressSchema);
module.exports = UserProgress;