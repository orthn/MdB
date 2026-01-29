const UserProgress = require('../models/userProgress');

const updateProgress = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const { challengeId, levelId, attempts } = req.body;

        if (!userId || !challengeId || !levelId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const progress = await UserProgress.findOneAndUpdate(
            { userId, levelId }, // 🔑 UNIQUE KEY
            {
                userId,
                challengeId,
                levelId,
                completed: true,
                completedAt: new Date(),
                $inc: { attempts: attempts ?? 1 }
            },
            {
                new: true,
                upsert: true // 🔥 creates if it does not exist
            }
        );

        return res.status(200).json(progress);
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Failed to update student progress', error });
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