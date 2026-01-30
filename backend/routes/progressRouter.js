const express = require("express");
const router = express.Router();

const {updateProgress, getMyProgress, getMyStatistics, getCompletedLevels} = require("../controllers/progressController");

router.get('/:id', getMyProgress)
router.get('/:id/stats', getMyStatistics)
router.get('/:id/completed', getCompletedLevels)

router.put('/:id', updateProgress);

module.exports = router;