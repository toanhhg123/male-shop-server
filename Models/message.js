const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const message = mongoose.model('message', messageSchema);

module.exports = message;
