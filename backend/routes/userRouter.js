const express = require('express');
const router = express.Router();
const {home, createUser, getUsers, resetPassword} = require('../controllers/userController');

router.get('/', home);
router.get('/getUsers', getUsers);

router.post('/createUser', createUser);
router.post('/resetPassword/:id', resetPassword);

module.exports = router;