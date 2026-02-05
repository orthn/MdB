const express = require("express");
const {getMyStatistics, getAllStatistics} = require("../controllers/statisticsController");
const router = express.Router();

router.get('/:id', getMyStatistics);
router.get('/all', getAllStatistics);

module.exports = router;
