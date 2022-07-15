const express = require('express');
const { sendMessage, getMessage } = require('../Controllers/messageController');
const { protect } = require('../middleware/AuthMiddleware');
const router = express.Router();

router.get('/get-chats/:chatId', protect, getMessage);
router.post('/send-message', protect, sendMessage);

module.exports = router;
