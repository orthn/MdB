const Student = require('../models/student');
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

        const student = await Student.findOne({username: username});
        if (!student) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        const isPasswordValid = student.password === password;
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        const token = jwt.sign({userId: student._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});
        const {password: _, ...userWithoutPassword} = student.toObject();

        return res.status(200).json({token, user: userWithoutPassword});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

const createStudent = async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();

        return res.status(201).json(newStudent);
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
        const createdStudents = await Student.insertMany(students, {ordered: false});

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

        const student = await Student.findById({_id: id});
        if (!student) {
            return res.status(404).json({message: 'Student not found'});
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
        const students = await Student.find()
        return res.status(200).json(students)
    } catch (error) {
        return res.status(400).send({message: 'Failed to retrieve students', error});
    }
}

const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById({_id: req.params.id});
        if (!student) {
            return res.status(404).json({message: 'Student not found'});
        }

        return res.status(200).json(student);
    } catch (error) {
        return res.status(400).send({message: 'Failed to retrieve student', error});
    }
}

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        // Using findByIdAndDelete for simplicity
        const deletedStudent = await Student.findByIdAndDelete({_id: id});

        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        return  res.status(200).json({ message: 'Student deleted', student: deletedStudent });
    } catch (error) {
        return res.status(400).json({ message: 'Failed to delete student', error });
    }
};

module.exports = {
    home, login, createStudent, createMany, getStudents, getStudentById, resetPassword, deleteStudent
};