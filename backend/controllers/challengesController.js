const Challenge = require("../models/challenge");
const Level = require("../models/level");
const User = require("../models/user");
const UserProgress = require("../models/userProgress");
const {login} = require("./studentController");

const getAllChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find({isActive: true});
        return res.status(200).json(challenges);
    } catch (error) {
        return res.status(400).json({message: 'Failed to retrieve challenges', error});
    }
}

const getChallengeById = async (req, res) => {
    try {
        const challenge = await Challenge.findById({_id: req.params.id});

        if (!challenge) {
            return res.status(404).json({message: 'Challenge not found'});
        }

        return res.status(200).json(challenge);
    } catch (error) {
        return res.status(400).json({message: 'Failed to retrieve challenge', error});
    }
}

const getLevelsOfChallenge = async (req, res) => {
    try {
        const {id} = req.params;

        const levels = await Level.find({
            challengeId: id,
        }).sort({order: 1})

        return res.status(200).json(levels)
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to retrieve levels',
            error
        })
    }
}

const getLevelById = async (req, res) => {
    try {
        const {id} = req.params;
        const level = await Level.findOne({_id: id}).sort({order: 1});
        if (!level) {
            return res.status(404).json({message: 'Level not found'});
        }

        return res.status(200).json(level);
    } catch (error) {
        return res.status(400).json({message: 'Failed to retrieve level', error});
    }
}

module.exports = {
    getAllChallenges,
    getChallengeById,
    getLevelsOfChallenge,
    getLevelById,
}