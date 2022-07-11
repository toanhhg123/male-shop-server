var express = require('express');
const {
    postRegister,
    postLogin,
    refreshToken,
    logOut,
    testProtect,
    updateProfile,
} = require('../Controllers/authController');
const { protect } = require('../middleware/AuthMiddleware');
var router = express.Router();

router.post('/register', postRegister);
router.post('/login', postLogin);
router.post('/refreshtoken', refreshToken);
router.post('/logout', logOut);
router.get('/test', protect, testProtect);
router.post('/update', updateProfile);

module.exports = router;
