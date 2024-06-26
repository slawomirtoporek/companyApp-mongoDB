const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products.controller');

router.get('/products', ProductController.get);

router.get('/products/random', ProductController.getRandom);

router.get('/products/:id', ProductController.getById);

router.post('/products', ProductController.post);

router.put('/products/:id', ProductController.put);

router.delete('/products/:id', ProductController.delete);

module.exports = router;