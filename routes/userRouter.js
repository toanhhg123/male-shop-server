var express = require('express');
const {
    postRegister,
    postLogin,
    refreshToken,
    logOut,
    getUserById,
    updateProfile,
    getUsersByUserName,
} = require('../Controllers/authController');
const { protect } = require('../middleware/AuthMiddleware');
var router = express.Router();

router.post('/register', postRegister);
router.post('/login', postLogin);
router.post('/refreshtoken', refreshToken);
router.post('/logout', logOut);
router.get('/get-user/:id', protect, getUserById);
router.get('/find-user/', getUsersByUserName);

router.post('/update', updateProfile);

module.exports = router;
