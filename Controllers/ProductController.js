'use strict';

const asyncHandler = require('express-async-handler');
const ProductModel = require('../Models/ProductModel');
const getProducts = asyncHandler(async (req, res) => {
    try {
        const { keyword } = req.query || '';
        const searchRegex = new RegExp(keyword, 'i');

        const page = req.query?.p || 1;
        const itemInPage = process.env.ITEMINPAGE || 16;
        const limit = req.query?.limit || itemInPage;

        const count = await ProductModel.countDocuments();
        const products = await ProductModel.find({ productName: searchRegex })
            .skip((page - 1) * itemInPage)
            .limit(limit);
        return products
            ? res.json({
                  products,
                  page,
                  pages: Math.ceil(count / itemInPage),
              })
            : res.status(404).json({ message: 'Not found' });
    } catch (error) {
        res.status(500).json({ ...error, message: error.message });
    }
});

const uploadProduct = asyncHandler(async (req, res) => {
    console.log(req.files);
    res.json({ imgs: req.files });
});

const getProductParams = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error('not params');

        const product = await ProductModel.findById(id).exec();
        product
            ? res.json(product)
            : res.status(500).json({ message: 'product not found' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

module.exports = {
    getProducts,
    uploadProduct,
    getProductParams,
};
