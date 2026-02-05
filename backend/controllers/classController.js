const Class = require("../models/class");
const Student = require("../models/user");
const User = require("../models/user");

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
        const {classId, studentId} = req.body;

        if (!classId || !studentId) {
            return res.status(400).json({message: 'classId and studentId required'});
        }

        const student = await User.findById(studentId);

        if (!student || student.role !== 'student') {
            return res.status(404).json({message: 'Student not found'});
        }

        // prevent duplicates
        await Class.findByIdAndUpdate(classId, {$addToSet: {students: studentId}});
        await User.findByIdAndUpdate(studentId, {$addToSet: {classes: classId}});

        return res.status(200).json({message: 'Student added to class'});
    } catch (error) {
        return res.status(500).json({message: 'Failed to add student', error});
    }
};

const removeStudentFromClass = async (req, res) => {
    try {
        const {classId, studentId} = req.body;

        await Class.findByIdAndUpdate(classId, {$pull: {students: studentId}});
        await User.findByIdAndUpdate(studentId, {$pull: {classes: classId}});

        return res.status(200).json({message: 'Student removed from class'});
    } catch (error) {
        return res.status(500).json({message: 'Failed to remove student', error});
    }
};


const createClass = async (req, res) => {
    try {
        const {name, description, students} = req.body;

        const draftClass = new Class({name: name, description: description, students: [...new Set(students)]});

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

const updateClass = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({message: 'Missing class ID'});
        }

        const course = await Class.findById({_id: id});
        if (!course) {
            return res.status(404).json({message: 'Student not found'});
        }

        const {name, description, students} = req.body;
        if (name !== undefined) course.name = name;
        if (description !== undefined) course.description = description;
        if (students !== undefined) course.students = students;

        await course.save();

        res.status(200).json({message: `Class "${course.name}" updated successfully`});
    } catch (error) {
        res.status(500).json({message: 'Failed to update class', error});
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
    updateClass,
}