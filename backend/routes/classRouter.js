const express = require('express');
const router = express.Router();
const {
    home, createClass, getUsersOfClass, addStudentToClass, getClassById, deleteClass, getClasses, removeStudentFromClass
} = require('../controllers/classController');

router.get('/', home);
router.get('/getAll', getClasses);
router.get('/:id', getClassById)
router.get('/:id/students', getUsersOfClass)

router.post('/create', createClass);

// add student to class
router.post('/:classID/:studentID', addStudentToClass);

// remove student from class
router.patch('/:classID/:studentID', removeStudentFromClass);

// delete class
router.delete('/:id', deleteClass);


module.exports = router;