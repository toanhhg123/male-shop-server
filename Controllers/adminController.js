const expressAsyncHandler = require('express-async-handler');
const userModel = require('../Models/userModel');
const productModle = require('../Models/ProductModel');

const getFullUserAdmin = expressAsyncHandler(async (req, res) => {
    try {
        const users = await userModel.find({ isAdmin: false });
        return res.json(users);
    } catch (error) {
        res.status(500).json({ ...error, message: error.message });
    }
});

const getFullProductAdmin = expressAsyncHandler(async (req, res) => {
    try {
        const products = await productModle.find({});
        return res.json(products);
    } catch (error) {
        res.status(500).json({ ...error, message: error.message });
    }
});

const uploadProduct = expressAsyncHandler(async (req, res) => {
    try {
        const {
            productName,
            price,
            description,
            type,
            quantity,
            color,
            size,
            brand,
            status,
        } = req.body;

        const imgs = req.files.map((file) => {
            return (
                req.protocol +
                '://' +
                req.get('host') +
                '/uploads/' +
                file.filename
            );
        });
        const imageUrl = imgs[0];

        console.log(imgs);

        const product = await productModle.create({
            productName,
            price,
            description,
            type,
            quantity,
            color,
            size,
            brand,
            imgs,
            imageUrl,
            material: 'comming',
            warranty: 'comming',
            origin: 'comming',
            status,
        });
        return res.json(product);
    } catch (error) {
        res.status(500).json({ ...error, message: error.message });
    }
});

const deleteProductAdmin = expressAsyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        console.log(req.params);
        await productModle.findByIdAndRemove(_id);
        return res.json('success');
    } catch (error) {
        res.status(500).json({ ...error, message: error.message });
    }
});

module.exports = {
    getFullUserAdmin,
    getFullProductAdmin,
    uploadProduct,
    deleteProductAdmin,
};
