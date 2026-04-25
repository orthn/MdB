const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
    mode: {type: String, enum: ['code', 'blocks'], required: true},
    code: {type: String, select: true},             // for text based solutions
    isCorrect: {type: Boolean, required: true},
    explanation: {type: String, select: true},
    feedback: {type: String, select: true},
}, {_id: false});

const hintSchema = new mongoose.Schema({
    text: String, order: Number
}, {_id: false});

const levelSchema = new mongoose.Schema({
    challengeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true},
    title: String,
    description: String,
    mode: { type: String, enum: ['code', 'blocks', 'mathematics'], required: true },
    starterCode: {type: String, default: ''},           // FOR TEXT BASED LEVELS
    blocklyBlocks: {type: Object, default: null},       // FOR FUTURE INTEGRATION OF BLOCKLY
    starterBlocks: {type: [String], default: null},     // FOR BLOCK BASED LEVELS
    expectedOutput: String,
    expectedAnswer: { type: String, default: null },   // für mathematics
    choices: { type: [String], default: null },        // für mathematics
    hints: [hintSchema],
    order: Number,
    isActive: Boolean,
    difficulty: {type: String, enum: ['easy', 'medium', 'hard'], default: 'easy'},
    xpReward: {
        type: Number,
        default: 10
    },
    solutions: {
        type: [solutionSchema],
        default: [],
        validate: {
            validator: function(sols) {
                // mathematics-Levels brauchen keine solutions
                if (this.mode === 'mathematics') return true;
                return sols.some(s => s.isCorrect);
            },
            message: 'Zumindest eine richtige Antwort ist erforderlich'
        }
    }
}, {timestamps: true});

const Level = mongoose.models.Level || mongoose.model('Level', levelSchema);
module.exports = Level;