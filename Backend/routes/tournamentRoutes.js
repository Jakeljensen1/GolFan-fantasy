// src/routes/tournamentRoutes.js
const { Router } = require('express');
const tournamentController = require('../controllers/tournamentController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = Router();

// read only routes
router.get('/', tournamentController.getTournaments);
router.get('/:id', tournamentController.getTournamentById);
router.get('/:id/golfers', tournamentController.getTournamentGolfers);

module.exports = router;
