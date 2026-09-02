const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/requireAdmin");
const adminController = require("../controllers/adminController");

router.get("/sync/tournaments", authMiddleware, requireAdmin, adminController.syncTournaments);

router.get("/sync/players", authMiddleware, requireAdmin, adminController.syncPlayers);

router.post("/seed", authMiddleware, requireAdmin, adminController.seedInitialData);

module.exports = router;
