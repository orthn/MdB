const User = require('../models/user');
const crypto = require("../services/cryptography");
const jwt = require('jsonwebtoken');

const home = async (req, res) => {
    return  res.status(200).json({message: 'Welcome to users!'});
}

const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({message: 'username and password is required'});
        }

        const user = await User.findOne({username: username});
        if (!user) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        const isPasswordValid = user.password === password;
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});
        const {password: _, ...userWithoutPassword} = user.toObject();

        return res.status(200).json({token, user: userWithoutPassword});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

const createUser = async (req, res) => {
    try {
        const {firstName, lastName, username, gender} = req.body;
        const pwd = crypto.generateRandomString()

        const draftUser = new User({
            firstName: firstName, lastName: lastName, username: username, password: pwd, gender: gender
        });

        const newUser = await draftUser.save()
        return  res.status(201).json(newUser);
    } catch (error) {
        return  res.status(400).send({message: 'Failed to create user', error});
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
        return  res.status(200).json(users)
    } catch (error) {
        return res.status(400).send({message: 'Failed to retrieve users', error});
    }
}

const getUserById = async (req, res) => {
    try {
        const {userID} = req.body;
        if (!userID) {
            return res.status(404).json({message: 'UserID is required'});
        }

        const user = await User.findById({_id: userID});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).send({message: 'Failed to retrieve users', error});
    }
}

module.exports = {
    home, createUser, getUsers, getUserById, resetPassword, login
};