const Class = require("../models/class");

const home = async (req, res) => {
    res.status(200).json({message: 'Welcome to classes!'});
}

const getUsersOfClass = async (req, res) => {
    try {
        const {classID} = req.body;

        const retrievedClass = await Class.findById({_id: classID})
        if (!retrievedClass) {
            return res.status(404).json({message: 'No Class Found'});
        }

        const users = retrievedClass.users;
        if (!users) {
            return res.status(404).json({message: 'No Users Found'});
        }

        return res.status(200).json({users: users})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

const addUserToClass = async (req, res) => {
    try {
        const {classID, userID} = req.body;

        const retrievedClass = await Class.findById({_id: classID})
        if (!retrievedClass) {
            return res.status(404).json({message: 'No Class Found'});
        }

        // Check if user already exists in the class
        if (retrievedClass.users.includes(userID)) {
            return res.status(400).json({ message: 'User already in class' });
        }

        // Add user and save
        retrievedClass.users.push(userID);
        await retrievedClass.save();

        return res.status(200).json({message: 'Successfully added user to class'});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

const createClass = async (req, res) => {
    try {
        const {name, description} = req.body;

        const draftClass = new Class({name: name, description: description, users: []});

        const newClass = await draftClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({message: 'Failed to create class', error});
    }
}

module.exports = {
    home,
    createClass,
    getUsersOfClass,
    addUserToClass,
}