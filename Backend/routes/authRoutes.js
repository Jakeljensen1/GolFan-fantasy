const { Router } = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const authController = require('../controllers/authControllers');

const router = Router();

//router.get('/signup', authController.signup_get);
// Won't need to send any data to React for get requests for login/signup, so these will be handled on the frontend

//signup route
router.post('/signup', authController.signup_post);

//login route
router.post('/login', authController.login_post);

// is user logged in?
router.get('/user', authMiddleware, authController.user_get);

module.exports = router;