const { Router } = require('express');
const lineupController = require('../controllers/lineupControllers');
const { authMiddleware } = require('../middleware/authMiddleware');
const scoringController = require('../controllers/scoringController')

const router = Router();

router.post('/', authMiddleware, lineupController.createLineup);
router.get('/user/all', authMiddleware, lineupController.getUserLineups);
router.get('/tournament/:id/leaderboard', authMiddleware, lineupController.getTournamentLineups);
router.get('/:id', authMiddleware, lineupController.getLineup);
router.post('/:id/compute-score', authMiddleware, scoringController.computeLineupScore);

module.exports = router;