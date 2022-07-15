const userModel = require('../Models/userModel');
const messageModel = require('../Models/message');
const chatModel = require('../Models/chat');
const asyncHandler = require('express-async-handler');
const sendMessage = asyncHandler(async (req, res) => {
    try {
        const { text, senderId, chatId } = req.body;
        if (!text || !senderId || !chatId)
            throw new Error('payload from client empty');
        if (
            !(await userModel.findById(senderId).exec()) ||
            !(await chatModel.findById(chatId).exec())
        )
            throw new Error('sender-id or chat-id not found');
        const message = await messageModel.create({
            senderId: senderId,
            chatId: chatId,
            text: text,
        });

        return res.json(message);
    } catch (error) {
        return res.status(500).json({ ...error, message: error.message });
    }
});

const getMessage = asyncHandler(async (req, res) => {
    try {
        const { chatId } = req.params;
        const fullChat = await messageModel.find({ chatId: chatId });

        return res.json(fullChat);
    } catch (error) {
        return res.status(500).json({ ...error, message: error.message });
    }
});

module.exports = {
    sendMessage,
    getMessage,
};
