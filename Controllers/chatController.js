const asyncHandler = require('express-async-handler');
const chatModel = require('../Models/chat');
const userModel = require('../Models/userModel');

const createChat = asyncHandler(async (req, res) => {
    try {
        const { firstId, secondId } = req.body;
        if (!firstId || !secondId)
            throw new Error('first-id or second-id not found');
        if (
            !(await userModel.findById(firstId).exec()) ||
            !(await userModel.findById(secondId).exec())
        )
            throw new Error('not found sender-user or receiver-user');
        let chat = await chatModel
            .findOne()
            .where('number')
            .all([firstId, secondId])
            .exec();

        chat = chat
            ? chat
            : await chatModel.create({ number: [firstId, secondId] });
        return res.json(chat);
    } catch (error) {
        return res.status(500).json({ ...error, message: error.message });
    }
});

const findChat = asyncHandler(async (req, res) => {
    try {
        const { number } = req.params;
        const userIds = number.split(':');
        console.log(userIds);
        const chat = await chatModel.findOne().where('number').all(userIds);
        if (!chat) throw new Error('chat not found');
        return res.json({ chat });
    } catch (error) {
        return res.status(500).json({ ...error, message: error.message });
    }
});

module.exports = {
    createChat,
    findChat,
};
