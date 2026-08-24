const { Router } = require('express');
const lineupController = require('../controllers/lineupControllers');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();

router.post('/', authMiddleware, lineupController.createLineup);
router.get('/:id', authMiddleware, lineupController.getLineup);
router.get('/user/all', authMiddleware, lineupController.getUserLineups);
router.post('/:id/compute-score', authMiddleware, lineupController.computeLineupScore);

module.exports = router;