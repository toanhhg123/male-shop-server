const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        number: {
            type: [mongoose.Schema.Types.ObjectId],
            require: true,
        },
    },
    { timestamps: true }
);

const chat = mongoose.model('chat', chatSchema);

module.exports = chat;
