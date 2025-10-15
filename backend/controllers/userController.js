const User = require('../models/user');
const crypto = require("../services/cryptography");

const home = async (req, res) => {
    console.log("http://localhost:5000/users/ triggered")
    res.status(200).json({message: 'Welcome to users!'});
}

const createUser = async (req, res) => {
    try {
        const {firstName, lastName, username, gender} = req.body;
        const pwd = crypto.generateRandomString()

        const draftUser = new User({
            firstName: firstName, lastName: lastName, username: username, password: pwd, gender: gender
        });

        const newUser = await draftUser.save()
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).send({message: 'Failed to create user', error});
    }
}

/**
 * Resets password of a given user. (Replaces old pwd with new one)
 */
const resetPassword = async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({message: 'Missing user ID'});
        }

        const user = await User.findById({_id: id});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        user.password = crypto.generateRandomString();
        await user.save();

        res.status(200).json({message: `Password of user "${user.username}" reset successfully`});
    } catch (error) {
        res.status(500).json({message: 'Failed to reset password', error});
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).send({message: 'Failed to retrieve users', error});
    }
}

module.exports = {
    home, createUser, getUsers, resetPassword
};