// src/routes/golferRoutes.js
const { Router } = require('express');
const golferController = require('../controllers/golferControllers');

const router = Router();

router.get('/', golferController.getAllGolfers);
router.get('/:id', golferController.getGolferById);

module.exports = router;
