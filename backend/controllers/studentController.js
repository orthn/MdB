const Student = require('../models/student');
const crypto = require("../services/cryptography");
const jwt = require('jsonwebtoken');

const home = async (req, res) => {
    return  res.status(200).json({message: 'Welcome to students!'});
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
        const {firstName, lastName, username, gender} = req.body;
        const pwd = crypto.generateRandomString()

        const student = new Student({
            firstName: firstName, lastName: lastName, username: username, password: pwd, gender: gender
        });

        await student.save()
        return  res.status(201).json(student);
    } catch (error) {
        return  res.status(400).send({message: 'Failed to create user', error});
    }
}

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

        student.password = crypto.generateRandomString();
        await student.save();

        res.status(200).json({message: `Password of student "${student.username}" reset successfully`});
    } catch (error) {
        res.status(500).json({message: 'Failed to reset password', error});
    }
};

const getStudents = async (req, res) => {
    try {
        const students = await Student.find()
        return  res.status(200).json(students)
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

module.exports = {
    home, login, createStudent, getStudents, getStudentById, resetPassword
};