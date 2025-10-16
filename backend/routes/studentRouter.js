const express = require('express');
const {home, getStudents, getStudentById, createStudent, resetPassword, login} = require("../controllers/studentController");
const router = express.Router();

router.get('/', home);
router.get('/getAll', getStudents);
router.get('/:id', getStudentById)

router.post('/create', createStudent);
router.post('/:id/reset-password', resetPassword);
router.post('/login', login);

module.exports = router;