const UserProgress = require('../models/userProgress');
const Challenge = require("../models/challenge");
const Level = require("../models/level");

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

        // get completed progress
        const completedLevels = await UserProgress.find({
            userId: id,
            completed: true
        });

        // total attempts
        const totalCompletedLevels = completedLevels.length;
        const totalAttempts = completedLevels.reduce(
            (acc, p) => acc + (p.attempts || 0), 0
        );

        // count completed per challenge
        const completedMap = {};
        completedLevels.forEach(p => {
            const key = p.challengeId.toString();
            completedMap[key] = (completedMap[key] || 0) + 1;
        });

        // get ALL active challenges
        const challenges = await Challenge.find({ isActive: true })
            .select('_id title order')
            .sort({ order: 1 });

        // get level totals using aggregation (FAST)
        const totals = await Level.aggregate([
            {
                $group: {
                    _id: "$challengeId",
                    total: {$sum: 1}
                }
            }
        ]);

        const totalMap = {};
        totals.forEach(t => {
            totalMap[t._id.toString()] = t.total;
        });

        const levelsPerChallenge = [];

        challenges.forEach(c => {
            const idStr = c._id.toString();

            levelsPerChallenge.push({
                challengeId: idStr,
                title: c.title,
                order: c.order,
                completed: completedMap[idStr] || 0,
                total: totalMap[idStr] || 0
            });
        });

        return res.status(200).json({
            totalCompletedLevels,
            totalAttempts,
            levelsPerChallenge
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Failed to load stats',
            error
        });
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