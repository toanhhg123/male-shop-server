const productModel = require('../Models/ProductModel');
const userModel = require('../Models/userModel');
const orderModel = require('../Models/orderModel');

const asyncHandler = require('express-async-handler');

const orderProduct = asyncHandler(async (req, res) => {
    try {
        const { productId, qty, totailPrice } = req.body;
        if (!productId || qty <= 0 || totailPrice <= 0)
            throw new Error('information from boby not valid');
        if (!(await userModel.findById(req?.user?._id).exec()))
            throw new Error('user Not found');

        const product = await productModel.findById(productId);

        if (!product || product.quantity < qty)
            throw new Error('product not valid');

        let order = await orderModel
            .findOne({ productId: productId, userId: req.user._id })
            .exec();
        if (order) {
            order = await orderModel.findOneAndUpdate(
                { productId: productId, userId: req.user._id },
                {
                    qty: qty,
                    totailPrice: totailPrice,
                }
            );
        } else {
            console.log('createnew');
            order = new orderModel({
                productId: productId,
                userId: req.user._id,
                qty,
                totailPrice,
            });
            await order.save();
        }

        const products = await orderModel.find({ userId: req.user._id });
        res.json(products);
    } catch (error) {
        console.log({ error });
        res.status(401).json({ message: error.message });
    }
});

const updateOrder = asyncHandler(async (req, res) => {
    try {
        const { productId, qty, totailPrice } = req.body;
        const order = await orderModel.findOneAndUpdate(
            { productId: productId, userId: req.user._id },
            {
                qty: qty,
                totailPrice: totailPrice,
            }
        );
        const products = await orderModel.find({ userId: req.user._id });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const deleteOrder = asyncHandler(async (req, res) => {
    try {
        const { productId } = req.params;
        if (!productId) throw new Error('productId not found!');
        console.log(productId);
        await orderModel.findOneAndDelete({
            productId: productId,
            userId: req.user._id,
        });
        const products = await orderModel.find({ userId: req.user._id });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getProductOrder = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;

        const order = await orderModel.find({ userId: _id }).exec();

        return res.json(order);
    } catch (error) {
        return res.status(500).json({ ...error, message: error.message });
    }
});

module.exports = {
    orderProduct,
    getProductOrder,
    updateOrder,
    deleteOrder,
};
