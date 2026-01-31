const UserProgress = require('../models/userProgress');
const User = require('../models/user');

const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await UserProgress.aggregate([

            { $match: { completed: true } },

            // convert if needed (safe even if already ObjectId)
            {
                $addFields: {
                    userId: { $toObjectId: '$userId' }
                }
            },

            {
                $group: {
                    _id: '$userId',
                    completedLevels: { $sum: 1 }
                }
            },

            { $sort: { completedLevels: -1 } },
            { $limit: 20 },

            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },

            { $unwind: '$user' },

            {
                $match: {
                    'user.isLocked': { $ne: true },
                    'user.isTeacher': { $ne: true }
                }
            },

            {
                $project: {
                    _id: 0,
                    userId: '$_id',
                    completedLevels: 1,
                    username: { $ifNull: ['$user.username', 'Spieler'] },
                }
            }
        ]);

        return res.status(200).json(leaderboard);
    } catch (error) {
        return res.status(500).json({message: 'Failed to load leaderboard', error});
    }
}

module.exports = {getLeaderboard}