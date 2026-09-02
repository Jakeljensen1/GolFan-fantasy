const { Router } = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const authController = require("../controllers/authControllers");

const router = Router();

router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.post("/logout", authController.logout_post);

router.get("/user", authMiddleware, authController.user_get);

module.exports = router;
