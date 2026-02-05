const UserProgress = require("../models/userProgress");
const Challenge = require("../models/challenge");
const Level = require("../models/level");

const getMyStatistics = async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({message: 'Missing ID'});
        }

        // get completed progress
        const completedLevels = await UserProgress.find({
            userId: id, completed: true
        });

        // total attempts
        const totalCompletedLevels = completedLevels.length;
        const totalAttempts = completedLevels.reduce((acc, p) => acc + (p.attempts || 0), 0);

        // count completed per challenge
        const completedMap = {};
        completedLevels.forEach(p => {
            const key = p.challengeId.toString();
            completedMap[key] = (completedMap[key] || 0) + 1;
        });

        // get ALL active challenges
        const challenges = await Challenge.find({isActive: true})
            .select('_id title order')
            .sort({order: 1});

        // get level totals using aggregation (FAST)
        const totals = await Level.aggregate([{
            $group: {
                _id: "$challengeId", total: {$sum: 1}
            }
        }]);

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
            totalCompletedLevels, totalAttempts, levelsPerChallenge
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Failed to load stats', error
        });
    }
}

const getAllStatistics = async (req, res) => {
    try {

        const stats = await UserProgress.aggregate([// only completed levels matter
            {$match: {completed: true}},

            // group by user
            {$group: {_id: "$userId", completedLevels: {$sum: 1}, totalAttempts: {$sum: "$attempts"}}},

            // join users
            {
                $lookup: {
                    from: "users", localField: "_id", foreignField: "_id", as: "user"
                }
            },

            {$unwind: "$user"},

            // hide teachers + locked users
            {
                $match: {
                    "user.isTeacher": {$ne: true}, "user.isLocked": {$ne: true}
                }
            },

            // shape response
            {
                $project: {
                    _id: 0,
                    userId: "$_id",
                    username: "$user.username",
                    firstName: "$user.firstName",
                    lastName: "$user.lastName",
                    completedLevels: 1,
                    totalAttempts: 1
                }
            },

            // optional but VERY useful
            {$sort: {completedLevels: -1}}]);

        return res.status(200).json(stats);

    } catch (error) {
        return res.status(500).json({
            message: 'Failed to load statistics', error
        });
    }
};

module.exports = {
    getMyStatistics,
    getAllStatistics
}