const express = require('express');
const router = express.Router();
const {
    orderProduct,
    getProductOrder,
    updateOrder,
    deleteOrder,
} = require('../Controllers/orderController');
const { protect } = require('../middleware/AuthMiddleware');

router.get('/get-products-order', protect, getProductOrder);
router.patch('/order-update', protect, updateOrder);
router.delete('/order-delete/:productId', protect, deleteOrder);
router.post('/', protect, orderProduct);

module.exports = router;
