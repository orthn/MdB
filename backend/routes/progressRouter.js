const express = require("express");
const router = express.Router();

const {updateProgress, getMyProgress, getCompletedLevels} = require("../controllers/progressController");

router.get('/:id', getMyProgress)
router.get('/:id/completed', getCompletedLevels)
router.put('/:id', updateProgress);

module.exports = router;