const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const userModel = require('../Models/userModel');
const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const { _id } = decoded;
            const user = await userModel.findById(_id);
            req.user = user;
            return next();
        } catch (error) {
            return res.status(403).json({ ...error, message: error.message });
        }
    }
    if (!token) return res.status(500).json({ message: 'not auth no token' });
});

module.exports = {
    protect,
};
