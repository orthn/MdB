const express = require('express');
const router = express.Router();
const {home, createClass} = require('../controllers/classController');

router.get('/', home);
router.post('/createClass', createClass);

module.exports = router;