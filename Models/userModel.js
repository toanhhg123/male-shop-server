const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },

        imageUrl: {
            type: String,
            required: true,
        },
        hash: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            require: true,
            default: false,
        },
        refreshToken: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
