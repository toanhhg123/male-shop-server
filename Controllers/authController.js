'use strict';

const asyncHandler = require('express-async-handler');
const userModel = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { cloudinay } = require('../Utils/Cloudinay');
const salt = Number(process.env.SALT) || 10;

const postRegister = asyncHandler(async (req, res) => {
    try {
        const { userName, password, email, imgBase64 } = req.body;
        if (!userName || !password || !email || !imgBase64)
            throw new Error('validate info send from client');

        if (await userModel.findOne({ userName })) {
            res.status(401);
            throw new Error('user name is already exist');
        }

        if (await userModel.findOne({ email })) {
            res.status(401);
            throw new Error('email is already exist');
        }
        const resuilt = await cloudinay.uploader.upload(imgBase64, {
            folder: 'male-shop',
        });

        const userNew = await userModel.create({
            userName,
            email,
            hash: bcrypt.hashSync(password, salt),
            imageUrl: resuilt.url,
        });

        return res.json({
            userInfo: userNew,
        });
    } catch (error) {
        return res.status(500).json({ ...error, message: error.message });
    }
});

const postLogin = asyncHandler(async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password)
            throw new Error('validate info send from client');
        const user = await userModel.findOne({ userName });
        if (!user) throw new Error('user name is not already exist');
        const { hash } = user;

        if (!bcrypt.compareSync(password, hash))
            throw new Error('password not found');

        const userInfo = {
            _id: user._id,
            userName: user.userName,
            email: user.email,
            imageUrl: user.imageUrl,
            isAdmin: user.isAdmin,
        };

        user.refreshToken = jwt.sign({ ...userInfo }, process.env.JWT_REFRESH);
        user.save();
        const de = jwt.verify(user.refreshToken, process.env.JWT_REFRESH);
        console.log(de);
        return res.json({
            userInfo: { ...userInfo },
            token: {
                refreshToken: user.refreshToken,
                accessToken: jwt.sign({ ...userInfo }, process.env.JWT_SECRET, {
                    expiresIn: '30s',
                }),
            },
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

const logOut = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(401);
            throw new Error('request data fail in body');
        }
        const user = await userModel.findById(id);
        if (!user) return res.status(401);
        user.refreshToken = '';
        await user.save();
        res.json({ message: 'success' });
    } catch (error) {
        return res.json({ ...error, message: error.message });
    }
});

const refreshToken = asyncHandler(async (req, res) => {
    try {
        const { refreshToken, userName } = req.body;
        if (!refreshToken || !userName) {
            throw new Error('refresh token and user name from body is fail');
        }
        if (!(await userModel.findOne({ refreshToken: refreshToken }))) {
            return res.status(401).json({ message: 'not token in db' });
        }
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH);
        if (!decoded) {
            throw new Error('refresh token not validate');
        }

        const { userName: userNameByToken } = decoded;

        if (userNameByToken !== userName) {
            throw new Error('refresh token illegal');
        }

        const userInfo = {
            _id: decoded._id,
            userName: decoded.userName,
            email: decoded.email,
            imageUrl: decoded.imageUrl,
            isAdmin: decoded.isAdmin,
        };

        res.json({
            accessToken: jwt.sign(userInfo, process.env.JWT_SECRET, {
                expiresIn: '30s',
            }),
        });
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
});

const updateProfile = asyncHandler(async (req, res) => {
    try {
        const { userName, email, password, newPassword } = req.body;
        console.log(req.body);
        if (!userName || !email || !password || !newPassword)
            throw new Error('validate info send from client');
        const user = await userModel.findOne({ userName });
        if (!user) throw new Error('user name is not already exist');
        const { hash } = user;
        if (!bcrypt.compareSync(password, hash))
            throw new Error('password not found');
        user.hash = bcrypt.hashSync(newPassword, salt);
        await user.save();

        res.json({ message: 'success' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

const testProtect = asyncHandler(async (req, res) => {
    res.json({ message: 'success' });
});

module.exports = {
    postRegister,
    postLogin,
    refreshToken,
    logOut,
    testProtect,
    updateProfile,
};
