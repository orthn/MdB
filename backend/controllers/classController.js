const Class = require("../models/class");

const home = async (req, res) => {
    res.status(200).json({message: 'Welcome to classes!'});
}

const createClass = async (req, res) => {
    try {
        const {name, description} = req.body;

        const draftClass = new Class({name: name, description: description, users: []});

        const newClass = await draftClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create class', error });
    }
}

module.exports = {
    home,
    createClass
}