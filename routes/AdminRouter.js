const express = require('express');
const upload = require('../config/muler');
const {
    getFullUserAdmin,
    getFullProductAdmin,
    uploadProduct,
    deleteProductAdmin,
} = require('../Controllers/adminController');
const router = express();

router.get('/users', getFullUserAdmin);
router.get('/products', getFullProductAdmin);
router.post('/upload', upload.array('photos', 8), uploadProduct);
router.delete('/delete/:_id', deleteProductAdmin);

module.exports = router;
