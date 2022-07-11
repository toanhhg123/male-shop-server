var express = require('express');
const {
    getProducts,
    uploadProduct,
    getProductParams,
} = require('../Controllers/ProductController');
const { protect } = require('../middleware/AuthMiddleware');
const upload = require('../config/muler');

var router = express.Router();

router.get('/product/:id', getProductParams);
router.get('/', getProducts);
router.post('/upload', upload.array('photos', 8), uploadProduct);

module.exports = router;
