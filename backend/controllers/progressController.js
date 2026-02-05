const UserProgress = require('../models/userProgress');
const Level = require("../models/level");
const User = require("../models/user");

const updateProgress = async (req, res) => {
    try {
        const {id: userId} = req.params;
        const {challengeId, levelId, attempts} = req.body;

        if (!userId || !challengeId || !levelId) {
            return res.status(400).json({message: 'Missing required fields'});
        }

        // Check for existing
        let progress = await UserProgress.findOne({ userId, levelId });

        // ALWAYS inc attempts
        if (progress) {
            progress.attempts += attempts ?? 1;
        }

        // Grant XP only on first completion of level
        if (!progress || !progress.completed) {
            const level = await Level.findById(levelId).select('xpReward');
            const xpReward = level?.xpReward ?? 10;
            progress = await UserProgress.findOneAndUpdate(
                { userId, levelId },
                {
                    userId,
                    challengeId,
                    levelId,
                    completed: true,
                    completedAt: new Date(),
                    xpEarned: xpReward,
                    $inc: { attempts: attempts ?? 1 }
                },
                { new: true, upsert: true }
            );

            // ⭐ increment cached total XP on user
            await User.findByIdAndUpdate(userId, {
                $inc: { xp: xpReward }
            });

        } else {
            await progress.save();
        }

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
    updateProgress, getMyProgress, getCompletedLevels
}