const express = require('express');
const router = express.Router();
const {home, createClass, getUsersOfClass, addUserToClass} = require('../controllers/classController');

router.get('/', home);
router.get('/getStudents', getUsersOfClass)

router.post('/create', createClass);
router.post('/addStudent', addUserToClass)


module.exports = router;