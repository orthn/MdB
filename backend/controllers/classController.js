const Class = require("../models/class");

const home = async (req, res) => {
    res.status(200).json({message: 'Welcome to classes!'});
}

const getStudentsOfClass = async (req, res) => {
    try {
        const retrievedClass = await Class.findById({_id: req.params.id})
        if (!retrievedClass) {
            return res.status(404).json({message: 'No Class Found'});
        }

        const students = retrievedClass.students;
        if (!students) {
            return res.status(404).json({message: 'No Students Found'});
        }

        return res.status(200).json({users: students})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

const getClasses = async (req, res) => {
    try {
        const classes = await Class.find()
        return res.status(200).json(classes)
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

const addStudentToClass = async (req, res) => {
    try {
        const {classID, studentID} = req.params;

        const retrievedClass = await Class.findById({_id: classID})
        if (!retrievedClass) {
            return res.status(404).json({message: 'No Class Found'});
        }

        // Check if user already exists in the class
        if (retrievedClass.students.includes(studentID)) {
            return res.status(400).json({message: 'Student already in class'});
        }

        // Add user and save
        retrievedClass.students.push(studentID);
        await retrievedClass.save();

        return res.status(200).json({message: 'Successfully added user to class'});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

const removeStudentFromClass = async (req, res) => {
    try {
        const {classID, studentID} = req.params;

        const retrievedClass = await Class.findById({_id: classID})
        if (!retrievedClass) {
            return res.status(404).json({message: 'No Class Found'});
        }

        if (!retrievedClass.students.includes(studentID)) {
            return res.status(404).json({message: 'Student not in class'});
        }

        retrievedClass.students.splice(retrievedClass.students.indexOf(studentID), 1);
        await retrievedClass.save();
        return res.status(200).json({message: 'Successfully removed student'});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

const createClass = async (req, res) => {
    try {
        const {name, description} = req.body;

        const draftClass = new Class({name: name, description: description, users: []});

        const newClass = await draftClass.save();
        return res.status(201).json(newClass);
    } catch (error) {
        return res.status(400).json({message: 'Failed to create class', error});
    }
}

const deleteClass = async (req, res) => {
    try {
        const {id} = req.params;

        const deletedClass = await Class.findByIdAndDelete({_id: id})
        if (!deletedClass) return res.status(404).json({message: 'Class not found'});

        return res.status(200).json({message: 'Successfully deleted class'});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

const getClassById = async (req, res) => {
    try {
        const retrievedClass = await Class.findById({_id: req.params.id});
        if (!retrievedClass) {
            return res.status(404).json({message: 'No Class Found'});
        }

        return res.status(200).json(retrievedClass);
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    home,
    createClass,
    getUsersOfClass: getStudentsOfClass,
    getClasses,
    addStudentToClass,
    getClassById,
    deleteClass,
    removeStudentFromClass,
}