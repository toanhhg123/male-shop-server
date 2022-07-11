const express = require('express');
const userModel = require('./Models/userModel');
const ProductModel = require('./Models/ProductModel');
const products = require('./data/Product');
const users = require('./data/users');
const importUserRouter = express.Router();

importUserRouter.post('/user', async (req, res) => {
    try {
        await userModel.remove({});
        const data = await userModel.insertMany(users);
        return res.json({ data });
    } catch (error) {
        res.json({ ...error });
    }
});

importUserRouter.post('/products', async (req, res) => {
    try {
        await ProductModel.deleteMany({});
        const data = await ProductModel.insertMany(products);
        return res.json({ message: 'Success', data: data });
    } catch (error) {
        res.json({ ...error });
    }
});

module.exports = {
    importUserRouter,
};
