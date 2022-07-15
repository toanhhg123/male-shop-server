const express = require('express');
const {
    createChat,
    findChat,
    findFriendChat,
} = require('../Controllers/chatController');
const { protect } = require('../middleware/AuthMiddleware');
const router = express.Router();

router.post('/create-chat', protect, createChat);
router.get('/find-chat/:number', protect, findChat);
router.post('/find-friend', findFriendChat);

module.exports = router;
