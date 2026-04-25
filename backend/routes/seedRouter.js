const express = require("express");
const router = express.Router();

const {programming, mathematics} = require("../controllers/seedController");

router.post('/programming', programming);
router.post('/mathematics', mathematics)

module.exports = router;