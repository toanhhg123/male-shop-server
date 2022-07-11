const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },

        imageUrl: {
            type: String,
            required: true,
        },
        imgs: {
            type: Array,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            default: 'new',
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        color: {
            type: Array,
            required: true,
            default: [],
        },
        size: {
            type: Array,
            required: true,
            default: [],
        },
        brand: {
            type: String,

            required: true,
            default: '',
        },
        material: {
            type: String,
            required: true,
            default: '',
        },
        warranty: {
            type: String,
            required: true,
            default: '',
        },
        origin: {
            type: String,
            required: true,
            default: '',
        },
        status: {
            type: String,
            required: true,
            default: 'new',
        },
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
