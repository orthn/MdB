const UserProgress = require('../models/userProgress');
const User = require('../models/user');

const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await UserProgress.aggregate([
            {$match: {completed: true}},
            // group by user
            {$group: {_id: '$userId', completedLevels: {$sum: 1}}},
            // sort descending
            {$sort: {completedLevels: -1}},
            // limit (important for kids apps)
            {$limit: 20},
            // join user data
            {$lookup: {from: 'users', localField: '_id', foreignField: '_id', as: 'user'}},
            {$unwind: '$user'},
            {$match: {'user.isLocked': {$ne: true}}},
            {$project: {_id: 0, userId: '$_id', username: '$user.username', completedLevels: 1}},
            {
                $project: {
                    _id: 0, userId: '$_id', completedLevels: 1, username:
                        {
                            $ifNull: ['$user.username', 'Spieler']
                        }
                }
            }
        ]);

        return res.status(200).json(leaderboard);
    } catch (error) {
        return res.status(500).json({message: 'Failed to load leaderboard', error});
    }
}

module.exports = {getLeaderboard}