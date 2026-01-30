const UserProgress = require('../models/userProgress');
const Challenge = require("../models/challenge");

const updateProgress = async (req, res) => {
    try {
        const {id: userId} = req.params;
        const {challengeId, levelId, attempts} = req.body;

        if (!userId || !challengeId || !levelId) {
            return res.status(400).json({message: 'Missing required fields'});
        }

        const progress = await UserProgress.findOneAndUpdate({userId, levelId}, // 🔑 UNIQUE KEY
            {
                userId, challengeId, levelId, completed: true, completedAt: new Date(), $inc: {attempts: attempts ?? 1}
            }, {
                new: true, upsert: true // 🔥 creates if it does not exist
            });

        return res.status(200).json(progress);
    } catch (error) {
        return res
            .status(500)
            .json({message: 'Failed to update student progress', error});
    }
};

const getMyProgress = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: 'Missing ID'});
        }

        const progress = await UserProgress.find({userId: id})
        if (!progress) {
            return res.status(400).json({message: 'Missing ID'});
        }

        return res.status(200).json(progress);
    } catch (error) {
        return res.status(500).json({message: 'Failed to load progress', error});
    }
};

const getMyStatistics = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: 'Missing ID'});
        }

        // total levels completed
        const completedLevels = await UserProgress.find({userId: id, completed: true});

        // total attempts
        const totalAttempts = completedLevels.reduce((acc, p) => acc + (p.attempts || 0), 0);

        const levelsPerChallengeMap = {};
        completedLevels.forEach(p => {
            levelsPerChallengeMap[p.challengeId] = (levelsPerChallengeMap[p.challengeId] || 0) + 1;
        });

        // levels per challenge
        const challengeIds = Object.keys(levelsPerChallengeMap);
        const challenges = await Challenge.find({_id: {$in: challengeIds}}).select('title');
        const levelsPerChallenge = {};
        challenges.forEach(c => {
            const idStr = c._id.toString();
            levelsPerChallenge[c.title] = levelsPerChallengeMap[idStr];
        });

        res.status(200).json({
            totalCompletedLevels: completedLevels.length,
            totalAttempts: totalAttempts,
            levelsPerChallenge: levelsPerChallenge,
        });
    } catch (error) {
        return res.status(200).json({message: 'Failed to load statistics', error});
    }
}

const getCompletedLevels = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: 'Missing ID'});
        }

        const progress = await UserProgress.find({userId: id, completed: true}).select('levelId');
        return res.status(200).json(progress);
    } catch (error) {
        return res.status(500).json({message: 'Failed to load progress', error});
    }
}

module.exports = {
    updateProgress, getMyProgress, getMyStatistics, getCompletedLevels
}