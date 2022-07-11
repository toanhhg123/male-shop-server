const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
        },
        shippingAddress: {
            adderss: { type: String, require: true },
            city: { type: String, require: true },
            postalCode: { type: String, require: true },
            country: { type: String, require: true },
        },
        paymentMethod: {
            type: String,
            require: true,
            default: 'money',
        },
        taxPrice: {
            // gia thue
            type: Number,
            require: true,
            default: 0.0,
        },
        shippingPrice: {
            // phi van chuyen
            type: Number,
            require: true,
            default: 0.0,
        },
        totailPrice: {
            type: Number,
            require: true,
            default: 0.0,
        },
        isPaid: {
            // duoc thanh toan
            type: Boolean,
            require: false,
            default: false,
        },
        deliveredAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
