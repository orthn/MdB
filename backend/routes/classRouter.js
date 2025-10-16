const express = require('express');
const router = express.Router();
const {home, createClass, getUsersOfClass, addUserToClass, getClassById} = require('../controllers/classController');

router.get('/', home);
router.get('/:id', getClassById)
router.get('/:id/students', getUsersOfClass)

router.post('/create', createClass);
router.post('/addStudent', addUserToClass)


module.exports = router;