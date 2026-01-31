const express = require("express");
const router = express.Router();

const { getAllChallenges, getChallengeById, getLevelsOfChallenge, getLevelById} = require("../controllers/challengesController");

router.get('/', getAllChallenges);
router.get('/:id', getChallengeById);
router.get('/:id/levels', getLevelsOfChallenge);
router.get('/:id/level', getLevelById);

module.exports = router;