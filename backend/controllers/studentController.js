const User = require('../models/user');
const helpers = require("../services/helper");
const jwt = require('jsonwebtoken');

const home = async (req, res) => {
    return res.status(200).json({message: 'Welcome to students!'});
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

const createStudent = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({message: 'Failed to create student', error});
    }
}

const createMany = async (req, res) => {
    try {
        let {students} = req.body;

        if (!students) {
            return res.status(400).json({message: 'Missing students data'});
        }

        // Ensure we always have an array
        if (!Array.isArray(students)) {
            students = [students];
        }

        // Use insertMany for efficiency
        const createdStudents = await User.insertMany(students, {ordered: false});

        return res.status(201).json({
            message: `${createdStudents.length} student(s) created successfully`,
            students: createdStudents,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error', error});
    }
};

/**
 * Resets password of a given student. (Replaces old pwd with new one)
 */
const resetPassword = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({message: 'Missing student ID'});
        }

        const student = await User.findById({_id: id});
        if (!student) {
            return res.status(404).json({message: 'User not found'});
        }

        student.password = helpers.generateRandomPassword();
        await student.save();

        res.status(200).json({message: `Password of student "${student.username}" reset successfully`});
    } catch (error) {
        res.status(500).json({message: 'Failed to reset password', error});
    }
};

const getStudents = async (req, res) => {
    try {
        const students = await User.find({isTeacher: false});
        return res.status(200).json(students)
    } catch (error) {
        return res.status(400).send({message: 'Failed to retrieve students', error});
    }
}

const getStudentById = async (req, res) => {
    try {
        const student = await User.findById({_id: req.params.id});
        if (!student) {
            return res.status(404).json({message: 'User not found'});
        }

        return res.status(200).json(student);
    } catch (error) {
        return res.status(400).send({message: 'Failed to retrieve student', error});
    }
}

const deleteStudent = async (req, res) => {
    try {
        const {id} = req.params;

        // Using findByIdAndDelete for simplicity
        const deletedStudent = await User.findByIdAndDelete({_id: id});

        if (!deletedStudent) {
            return res.status(404).json({message: 'User not found'});
        }

        return res.status(200).json({message: 'User deleted', student: deletedStudent});
    } catch (error) {
        return res.status(400).json({message: 'Failed to delete student', error});
    }
};

const updateStudent = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({message: 'Missing student ID'});
        }

        const student = await User.findById({_id: id});
        if (!student) {
            return res.status(404).json({message: 'User not found'});
        }

        const {firstName, lastName, gender, settings, absolvedLevels} = req.body;
        if (firstName !== undefined) student.firstName = firstName;
        if (lastName !== undefined) student.lastName = lastName;
        if (gender !== undefined) student.gender = gender;
        if (settings !== undefined) student.settings = settings;
        if (absolvedLevels !== undefined) student.absolvedLevels = absolvedLevels;

        await student.save();

        return res.status(200).json({message: `Password of student "${student.username}" reset successfully`});
    } catch (error) {
        return res.status(500).json({message: 'Failed to reset password', error});
    }
}



const getUserSettings = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({message: 'Missing student ID'});
        }

        const user = await User.findById({_id: id}).select('settings');
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user.settings);
    } catch (err) {
        res.status(400).json({message: 'Failed to load settings', err});
    }
};

module.exports = {
    home,
    login,
    createStudent,
    createMany,
    getStudents,
    getStudentById,
    resetPassword,
    deleteStudent,
    updateStudent,
    getUserSettings,
};