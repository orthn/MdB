const express = require('express');
const router = express.Router();
const {home, createUser, getUsers, resetPassword, login, getUserById} = require('../controllers/userController');

router.get('/', home);
router.get('/getAll', getUsers);
router.get('/get', getUserById)

router.post('/create', createUser);
router.post('/resetPassword/:id', resetPassword);
router.post('/login', login);

module.exports = router;