const express = require('express');
const router = express.Router();
const {
    home, createClass, getUsersOfClass, addStudentToClass, getClassById, deleteClass, getClasses, removeStudentFromClass,
    updateClass
} = require('../controllers/classController');
const {updateUser} = require("../controllers/studentController");

router.get('/', home);
router.get('/getAll', getClasses);
router.get('/:id', getClassById)
router.get('/:id/students', getUsersOfClass)

router.post('/create', createClass);

router.put('/:id/update', updateClass);

// add student to class
router.post('/:classID/:studentID', addStudentToClass);

// remove student from class
router.patch('/:classID/:studentID', removeStudentFromClass);

// delete class
router.delete('/:id', deleteClass);


module.exports = router;